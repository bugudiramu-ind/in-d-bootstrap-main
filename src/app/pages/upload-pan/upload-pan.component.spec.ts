import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPANComponent } from './upload-pan.component';

describe('UploadPANComponent', () => {
  let component: UploadPANComponent;
  let fixture: ComponentFixture<UploadPANComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPANComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPANComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
