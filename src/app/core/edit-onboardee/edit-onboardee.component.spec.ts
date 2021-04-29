import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOnboardeeComponent } from './edit-onboardee.component';

describe('EditOnboardeeComponent', () => {
  let component: EditOnboardeeComponent;
  let fixture: ComponentFixture<EditOnboardeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOnboardeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOnboardeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
