import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from './chat.service';
import { ChatMessage, ChatThread } from './chat.models';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage = '';
  threads: ChatThread[] = [];
  selectedThread: ChatThread | null = null;
  searchTerm = '';

  constructor(
    private chat: ChatService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.auth.user?.role === 'support') {
      this.loadThreads();
    } else {
      this.loadUserThread();
    }
  }

    send() {
    if (!this.newMessage?.trim() || !this.auth.user?.id) {
      return;
    }

    const sendMessageObservable = this.auth.user.role === 'support' 
      ? this.chat.supportSendMessage(this.selectedThread?.id || 0, this.newMessage)
      : this.chat.userSendMessage(this.auth.user.id, this.newMessage);

    sendMessageObservable.subscribe(
      (response: ChatMessage) => {
        this.messages.push(response);
        this.newMessage = '';
        setTimeout(() => {
          const container = document.querySelector('.messages-container');
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        });
      },
      (error) => {
        console.error('Erreur lors de l\'envoi du message:', error);
      }
    );
  }

  loadThreads() {
    this.chat.getAllThreads().subscribe(threads => {
      this.threads = threads.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  }

  loadUserThread() {
    const user = this.auth.user;
    if (!user) return;
    this.chat.getUserThreads(user.id).subscribe(threads => {
      if (threads.length > 0) {
        this.selectedThread = threads[0];
        this.loadMessages();
      } else {
        this.selectedThread = null;
        this.messages = [];
      }
    });
  }

  loadMessages() {
    if (!this.selectedThread) return;
    this.chat.getMessages(this.selectedThread.id).subscribe(msgs => this.messages = msgs);
  }

  selectThread(thread: ChatThread) {
    this.selectedThread = thread;
    this.loadMessages();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getFilteredThreads(): ChatThread[] {
    if (!this.searchTerm.trim()) {
      return this.threads;
    }
    
    const search = this.searchTerm.toLowerCase();
    return this.threads.filter(thread => 
      thread.id.toString().includes(search) ||
      thread.userId.toString().includes(search) ||
      thread.createdAt.toString().toLowerCase().includes(search)
    );
  }
}