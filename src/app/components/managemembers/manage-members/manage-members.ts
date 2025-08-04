import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../../services/membe-service';
import { IMember } from '../../../models/IMember';
import { UserWithMember } from '../../../models/register-member';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-members.html',
  styleUrls: ['./manage-members.css']
})
export class ManageMembersComponent implements OnInit {
  members: IMember[] = [];
  isEditMode = false;
  editingId: number | null = null;

  member: UserWithMember = {
    name: '',
    email: '',
    phone: ''
  };

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers() {
    this.memberService.getAllMembers().subscribe(
      (res) => {
        this.members = res;
      },
      (err) => {
        console.error('Failed to fetch members', err);
      }
    );
  }

  onSubmit() {
    if (!this.member.name || !this.member.email || !this.member.phone) {
      alert("All fields are required");
      return;
    }

    if (this.isEditMode && this.editingId !== null) {
      this.memberService.updateMember(this.editingId, this.member).subscribe({
        next: () => {
          alert("Member updated successfully");
          this.clearForm();
          this.getAllMembers();
        },
        error: (err) => {
          console.error("Update failed", err);
        }
      });
    } else {
      this.memberService.addMember(this.member).subscribe({
        next: () => {
          alert("Member added successfully");
          this.clearForm();
          this.getAllMembers();
        },
        error: (err) => {
          console.error("Add failed", err);
          alert("Failed to add member");
        }
      });
    }
  }

  onEdit(mem: IMember) {
    this.isEditMode = true;
    this.editingId = mem.memberId;
    this.member = {
      name: mem.name,
      email: mem.email,
      phone: mem.phone
    };
  }

  clearForm() {
    this.member = { name: '', email: '', phone: '' };
    this.isEditMode = false;
    this.editingId = null;
  }

  deleteMember(id: number) {
    if (confirm('Are you sure you want to delete this member?')) {
      this.memberService.deleteMember(id).subscribe(
        () => {
          this.members = this.members.filter((m) => m.memberId !== id);
        },
        (err) => {
          console.error('Error deleting member', err);
        }
      );
    }
  }
}
