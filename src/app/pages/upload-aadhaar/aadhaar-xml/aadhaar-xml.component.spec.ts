import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadhaarXMLComponent } from './aadhaar-xml.component';

describe('AadhaarXMLComponent', () => {
  let component: AadhaarXMLComponent;
  let fixture: ComponentFixture<AadhaarXMLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AadhaarXMLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AadhaarXMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
