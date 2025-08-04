import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-navbar.html',
  styleUrls: ['./user-navbar.css']
})
export class UserNavbarComponent implements OnInit {

  memberId!: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient // ✅ You missed this
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.memberId = user?.memberId || 0;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  openReturnPrompt() {
    const bookId = prompt("Enter Book ID to return:");
    if (bookId) {
      this.http.put(`https://localhost:5026/api/bookissue/return/${bookId}`, {})
        .subscribe({
          next: () => alert("Book returned successfully!"),
          error: () => alert("Failed to return book. Check Book ID.")
        });
    }
  }
}
