import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewUserComponent } from './create-new-user.component';

describe('CreateNewUserComponent', () => {
  let component: CreateNewUserComponent;
  let fixture: ComponentFixture<CreateNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
