import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistQuadrantComponent } from './hist-quadrant.component';

describe('HistQuadrantComponent', () => {
  let component: HistQuadrantComponent;
  let fixture: ComponentFixture<HistQuadrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistQuadrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistQuadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
