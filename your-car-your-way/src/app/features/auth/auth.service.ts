import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/users';
  private currentUser: User | null = null;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    try {
      const stored = localStorage?.getItem('user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('LocalStorage non disponible');
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<User>(
      `${this.apiUrl}/login`, 
      { username: email, password },
      this.httpOptions
    ).pipe(
      tap(user => {
        console.log('Réponse du serveur:', user);
        if (user) {
          // Définir le rôle en fonction de l'email
          this.currentUser = {
            ...user,
            role: email === 'support@email.com' ? 'support' : 'user'
          };
          try {
            localStorage?.setItem('user', JSON.stringify(this.currentUser));
          } catch (error) {
            console.warn('LocalStorage non disponible');
          }
        }
      }),
      map(user => !!user),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    try {
      localStorage?.removeItem('user');
    } catch (error) {
      console.warn('LocalStorage non disponible');
    }
    this.router.navigate(['/login']);
  }

  get user(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}