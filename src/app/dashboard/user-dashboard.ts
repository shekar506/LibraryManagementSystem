import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book-service';
import { IBook } from '../models/IBook';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { UserNavbarComponent } from '../user-navbar/user-navbar';

@Component({
  imports:[CommonModule,FormsModule,UserNavbarComponent],
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboard implements OnInit {
  books: IBook[] = [];
  filteredBooks: IBook[] = [];
  searchText: string = '';
  showAvailableOnly: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data;
      this.applyFilters();
    });
  }

 applyFilters(): void {
  this.filteredBooks = this.books.filter(book =>
    book.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
    (!this.showAvailableOnly || book.availabilityStatus === "Available")
  );

  }
}
