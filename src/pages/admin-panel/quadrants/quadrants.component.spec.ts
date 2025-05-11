import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadrantsComponent } from './quadrants.component';

describe('QuadrantsComponent', () => {
  let component: QuadrantsComponent;
  let fixture: ComponentFixture<QuadrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadrantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuadrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
