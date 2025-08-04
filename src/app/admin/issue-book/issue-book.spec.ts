import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBook } from './issue-book';

describe('IssueBook', () => {
  let component: IssueBook;
  let fixture: ComponentFixture<IssueBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
