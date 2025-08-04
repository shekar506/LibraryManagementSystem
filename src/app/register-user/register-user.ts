import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.css']
})
export class RegisterUser {
  formData = {
    username: '',
    password: '',
    role: 'Member' // or any default role like 'User'
  };

  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (!this.formData.username || !this.formData.password || !this.formData.role) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('http://localhost:5026/api/Auth/register-member', this.formData, { headers })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => {
          console.error('Registration failed:', err);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
  }
}
