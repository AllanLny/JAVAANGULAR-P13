import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      this.auth.login(username, password).subscribe({
        next: (success) => {
          if (success) {
            console.log('Connexion réussie');
            this.router.navigate(['/chat']);
          } else {
            console.error('Échec de la connexion');
            this.error = 'Identifiants invalides';
          }
        },
        error: (err) => {
          console.error('Erreur de connexion:', err);
          this.error = 'Erreur lors de la connexion';
        }
      });
    }
  }
}