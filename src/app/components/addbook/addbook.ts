import { Component } from '@angular/core';
import { BookService } from '../../services/book-service';
import { IBook } from '../../models/IBook';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addbook.html',
})
export class AddBook {
  book: IBook = {
    bookId: 0,
    title: '',
    author: '',
    availabilityStatus: '',
    isbn: '',
  };

  successMessage: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  addBook() {
    this.bookService.addBook(this.book).subscribe({
      next: () => {
        this.successMessage = 'Book added successfully!';
        setTimeout(() => {
          this.router.navigate(['/manage-books']);
        }, 2000); // Redirect after 2 seconds
      },
      error: (err) => {
        this.successMessage = 'Error adding book.';
      }
    });
  }
}
