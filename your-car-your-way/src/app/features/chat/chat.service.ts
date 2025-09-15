import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ChatMessage, ChatThread } from './chat.models';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = '';  // Enlever le /api car il est déjà dans les endpoints
  private messageSubject = new Subject<ChatMessage>();
  private connectedSubject = new BehaviorSubject<boolean>(false);
  private ws: WebSocket | null = null;

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      this.initializeWebSocketConnection();
    }
  }

private initializeWebSocketConnection() {
    const wsUrl = `ws://${window.location.host}/api/ws`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
        console.log('WebSocket Connected!');
        this.connectedSubject.next(true);
    };

    this.ws.onclose = () => {
        console.log('WebSocket Disconnected');
        this.connectedSubject.next(false);
        // Tentative de reconnexion après 5 secondes
        setTimeout(() => this.initializeWebSocketConnection(), 5000);
    };

    this.ws.onmessage = (event) => {
        const chatMessage = JSON.parse(event.data);
        this.messageSubject.next(chatMessage);
    };
}

  subscribeToThread(threadId: number) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'SUBSCRIBE', threadId }));
    }
  }

  onNewMessage(): Observable<ChatMessage> {
    return this.messageSubject.asObservable();
  }

  isConnected(): Observable<boolean> {
    return this.connectedSubject.asObservable();
  }

  // Pour l'utilisateur : envoie un message, crée le thread si besoin
  userSendMessage(userId: number, message: string): Observable<ChatMessage> {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ 
        type: 'USER_MESSAGE',
        senderId: userId, 
        message 
      }));
    }
    return this.http.post<ChatMessage>(`${this.apiUrl}/api/chat/user/${userId}/message`, {
      message
    });
  }

  // Pour le support : envoie un message dans un thread existant
  supportSendMessage(threadId: number, message: string): Observable<ChatMessage> {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ 
        type: 'SUPPORT_MESSAGE',
        threadId, 
        message 
      }));
    }
    return this.http.post<ChatMessage>(`${this.apiUrl}/api/chat/threads/${threadId}/support-message`, {
      message
    });
  }

  // Liste des threads pour le support
  getAllThreads(): Observable<ChatThread[]> {
    return this.http.get<ChatThread[]>(`${this.apiUrl}/api/chat/threads`);
  }

  // Liste des threads d'un utilisateur
  getUserThreads(userId: number): Observable<ChatThread[]> {
    return this.http.get<ChatThread[]>(`${this.apiUrl}/api/chat/user/${userId}/threads`);
  }

  // Liste des messages d'un thread
  getMessages(threadId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/api/chat/threads/${threadId}/messages`);
  }
}
