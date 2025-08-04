import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from '../models/IBook';
import { BookService } from '../services/book-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editbook.html',
})
export class EditBookComponent implements OnInit {
  book: IBook = {
    bookId: 0,
    title: '',
    author: '',
    isbn: '',
    availabilityStatus: ''
  };

  message: string = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        const found = books.find(b => b.bookId === id);
        if (found) {
          this.book = { ...found };
        } else {
          this.message = 'Book not found!';
          setTimeout(() => this.router.navigate(['/manage-books']), 2000);
        }
      },
      error: () => {
        this.message = 'Error fetching books!';
        setTimeout(() => this.router.navigate(['/manage-books']), 2000);
      }
    });
  }

  updateBook(): void {
    this.bookService.updateBook(this.book.bookId, this.book).subscribe({
      next: () => {
        this.message = 'Book updated successfully!';
        setTimeout(() => this.router.navigate(['/manage-books']), 2000);
      },
      error: () => {
        this.message = 'Failed to update book!';
      }
    });
  }
}
