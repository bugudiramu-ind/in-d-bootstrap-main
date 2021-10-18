import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureAadhaarComponent } from './capture-aadhaar.component';

describe('CaptureAadhaarComponent', () => {
  let component: CaptureAadhaarComponent;
  let fixture: ComponentFixture<CaptureAadhaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureAadhaarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureAadhaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
