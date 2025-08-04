import { Component, OnInit } from '@angular/core';
import { IBook } from '../models/IBook';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { BookService } from '../services/book-service';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-admin-home',
  templateUrl: './admin-dashboard.html',
  styleUrl:'./admin-dashboard.css',
  imports: [CommonModule, RouterModule,AdminNavbar,FormsModule],
})
export class AdminDashboard implements OnInit {
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
