import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOnboardeeComponent } from './new-onboardee.component';

describe('NewOnboardeeComponent', () => {
  let component: NewOnboardeeComponent;
  let fixture: ComponentFixture<NewOnboardeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOnboardeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOnboardeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
