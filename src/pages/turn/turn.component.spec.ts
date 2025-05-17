import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnComponent } from './turn.component';

describe('TurnComponent', () => {
  let component: TurnComponent;
  let fixture: ComponentFixture<TurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
