import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceUpdateComponent } from './absence-update.component';

describe('AbsenceUpdateComponent', () => {
  let component: AbsenceUpdateComponent;
  let fixture: ComponentFixture<AbsenceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
