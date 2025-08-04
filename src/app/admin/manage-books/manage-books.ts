import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book-service';
import { IBook } from '../../models/IBook';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-books.html',
  styleUrl:'./manage-books.css'
})
export class ManageBooks implements OnInit {
  books: IBook[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe(
      (res) => {
        this.books = res;
      },
      (err) => {
        console.error('Failed to fetch books', err);
      }
    );
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(
        () => {
          this.books = this.books.filter((book) => book.bookId !== id);
        },
        (err) => {
          console.error('Error deleting book', err);
        }
      );
    }
  }

 onEdit(book: IBook) {
  this.router.navigate(['/edit-book', book.bookId]);
}

  navigateToAddBook() {
    this.router.navigate(['/add-book']);
  }
}
