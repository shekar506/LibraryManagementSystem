import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './issue-book.html',
})
export class IssueBook implements OnInit {
  bookId: number = 0;
  memberId: number = 0;
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  issueBook() {
    const payload = {
      bookId: this.bookId,
      memberId: this.memberId
    };

    this.http.post('http://localhost:5026/api/BookIssue', payload).subscribe({
      next: res => {
        this.message = 'Book issued successfully!';
      },
      error: err => {
        this.message = 'Failed to issue book. Please check Book ID and Member ID.';
      }
    });
  } 
}