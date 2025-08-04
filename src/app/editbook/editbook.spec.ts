import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editbook } from './editbook';

describe('Editbook', () => {
  let component: Editbook;
  let fixture: ComponentFixture<Editbook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editbook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editbook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
