import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  
  imports: [FormsModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.html',      // relative path to .ts file
  styleUrls: ['./login.css'],// <<---- Make sure the path matches your structure!
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        const role = this.authService.getUserRole();

        if (role === 'Admin') {
          this.router.navigate(['/admin-home']);
        } else if (role === 'User') {
          this.router.navigate(['/user-home']);
        } else {
          this.router.navigate(['/login']); // fallback
        }
      },
      error: (err) => {
        this.error = 'Login failed'; // Use this, not alert!
      }
    });
  }
  navigateToRegister() {
this.router.navigate(['/register']);
  }
}