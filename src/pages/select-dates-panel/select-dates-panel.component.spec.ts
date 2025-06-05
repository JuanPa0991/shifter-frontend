import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDatesPanelComponent } from './select-dates-panel.component';

describe('SelectDatesPanelComponent', () => {
  let component: SelectDatesPanelComponent;
  let fixture: ComponentFixture<SelectDatesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDatesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDatesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
