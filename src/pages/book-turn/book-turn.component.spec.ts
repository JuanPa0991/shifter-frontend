import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTurnComponent } from './book-turn.component';

describe('BookTurnComponent', () => {
  let component: BookTurnComponent;
  let fixture: ComponentFixture<BookTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTurnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
