import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceAbsenceDetailsComponent } from './presence-absence-details.component';

describe('PresenceAbsenceDetailsComponent', () => {
  let component: PresenceAbsenceDetailsComponent;
  let fixture: ComponentFixture<PresenceAbsenceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceAbsenceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceAbsenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
