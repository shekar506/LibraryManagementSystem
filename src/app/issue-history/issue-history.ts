import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 ADD THIS
import { ActivatedRoute } from '@angular/router';
import { BookIssueService } from '../services/bookissueservice';

@Component({
  selector: 'app-issue-history',
  standalone: true,
  imports: [CommonModule], // 👈 FIX: Import CommonModule for *ngIf, *ngFor
  templateUrl: './issue-history.html'
})
export class IssueHistoryComponent implements OnInit {
  public memberId!: number;
  public issues: any[] = [];

  constructor(private route: ActivatedRoute, private issueService: BookIssueService) {}

  ngOnInit(): void {
    this.memberId = +this.route.snapshot.paramMap.get('memberId')!;
    this.issueService.getIssuesByMemberId(this.memberId).subscribe({
      next: data => this.issues = data,
      error: err => console.error('Failed to load issue history:', err)
    });
  }
}
