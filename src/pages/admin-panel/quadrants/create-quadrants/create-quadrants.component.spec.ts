import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuadrantsComponent } from './create-quadrants.component';

describe('CreateQuadrantsComponent', () => {
  let component: CreateQuadrantsComponent;
  let fixture: ComponentFixture<CreateQuadrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuadrantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQuadrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
