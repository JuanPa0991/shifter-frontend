import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadrantsHistoryComponent } from './quadrants-history.component';

describe('QuadrantsHistoryComponent', () => {
  let component: QuadrantsHistoryComponent;
  let fixture: ComponentFixture<QuadrantsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadrantsHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuadrantsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
