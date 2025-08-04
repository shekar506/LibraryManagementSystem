import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../models/IBook';

export interface Book {
  bookId: number;
  title: string;
  author: string;
  isbn: string;
  availabilityStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:5026/api/Book';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Book[]>(this.baseUrl, { headers });
  }

  updateBook(id: number, book: Book): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/${id}`, book, { headers });
  }

  deleteBook(bookId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.baseUrl}/${bookId}`, { headers });
  }
returnBook(bookId: number) {
  return this.http.put(`http://localhost:5026/api/BookIssue/return/${bookId}`, {});
}

  addBook(book: IBook): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}`, book, { headers });
  }
}
