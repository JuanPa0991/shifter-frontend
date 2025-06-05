import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateQuadrantComponent } from './create-quadrant.component';

describe('CreateQuadrantComponent', () => {
  let component: CreateQuadrantComponent;
  let fixture: ComponentFixture<CreateQuadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuadrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQuadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
