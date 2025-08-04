import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserWithMember } from '../models/register-member';
import { IMember } from '../models/IMember';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = 'http://localhost:5026/api/Member';

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<IMember[]> {
    return this.http.get<IMember[]>(this.baseUrl);
  }

  addMember(payload: UserWithMember): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-member`, payload);
  }

  updateMember(id: number, member: UserWithMember): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/${id}`, member, { headers });
  }

  deleteMember(memberId: number): Observable<void> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.baseUrl}/${memberId}`, { headers });
  }
}
