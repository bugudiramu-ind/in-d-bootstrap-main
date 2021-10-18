import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadhaarOTPComponent } from './aadhaar-otp.component';

describe('AadhaarOTPComponent', () => {
  let component: AadhaarOTPComponent;
  let fixture: ComponentFixture<AadhaarOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AadhaarOTPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AadhaarOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
