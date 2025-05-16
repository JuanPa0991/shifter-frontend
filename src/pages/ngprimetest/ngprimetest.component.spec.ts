import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgprimetestComponent } from './ngprimetest.component';

describe('NgprimetestComponent', () => {
  let component: NgprimetestComponent;
  let fixture: ComponentFixture<NgprimetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgprimetestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgprimetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
