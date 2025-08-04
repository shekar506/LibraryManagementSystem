import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueHistory } from './issue-history';

describe('IssueHistory', () => {
  let component: IssueHistory;
  let fixture: ComponentFixture<IssueHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
