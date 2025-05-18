import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownGroupsComponent } from './drop-down-groups.component';

describe('DropDownGroupsComponent', () => {
  let component: DropDownGroupsComponent;
  let fixture: ComponentFixture<DropDownGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
