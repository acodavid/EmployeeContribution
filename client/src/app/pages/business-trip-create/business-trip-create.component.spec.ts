import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTripCreateComponent } from './business-trip-create.component';

describe('BusinessTripCreateComponent', () => {
  let component: BusinessTripCreateComponent;
  let fixture: ComponentFixture<BusinessTripCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessTripCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTripCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
