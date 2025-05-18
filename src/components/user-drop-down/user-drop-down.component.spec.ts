import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDropDownComponent } from './user-drop-down.component';

describe('UserDropDownComponent', () => {
  let component: UserDropDownComponent;
  let fixture: ComponentFixture<UserDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDropDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
