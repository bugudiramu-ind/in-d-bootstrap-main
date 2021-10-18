import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLivelinessComponent } from './check-liveliness.component';

describe('CheckLivelinessComponent', () => {
  let component: CheckLivelinessComponent;
  let fixture: ComponentFixture<CheckLivelinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckLivelinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckLivelinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
