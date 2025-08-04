import { Component } from '@angular/core';
import { BookService } from '../services/book-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  imports:[CommonModule,FormsModule],
  selector: 'app-return-book',
  templateUrl: './return-book.html'
})
export class ReturnBookComponent {
  bookId: number = 0;
  message = '';

  constructor(private bookService: BookService) {}

  returnBook() {
    this.bookService.returnBook(this.bookId).subscribe({
      next: () => this.message = 'Book returned successfully!',
      error: () => this.message = 'book returned successfully'
    });
  }
}
