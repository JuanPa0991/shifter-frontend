import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownTurnsComponent } from './drop-down-turns.component';

describe('DropDownTurnsComponent', () => {
  let component: DropDownTurnsComponent;
  let fixture: ComponentFixture<DropDownTurnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownTurnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownTurnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
