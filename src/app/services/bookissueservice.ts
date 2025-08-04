import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookIssue {
  issueId: number;
  bookId: number;
  memberId: number;
  issueDate: string;
  returnDate?: string;
  book: {
    title: string;
    author: string;
  };
  member: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BookIssueService {
  private baseUrl = 'https://localhost:5026/api/BookIssue';

  constructor(private http: HttpClient) {}

  getIssuesByMemberId(memberId: number): Observable<BookIssue[]> {
    return this.http.get<BookIssue[]>(`${this.baseUrl}/member/${memberId}`);
  }
  getIssueHistory(memberId: number): Observable<any[]> {
  return this.http.get<any[]>(`/api/bookissues/history/${memberId}`);
}

}
