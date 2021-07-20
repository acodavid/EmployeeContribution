import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceCreateComponent } from './absence-create.component';

describe('AbsenceCreateComponent', () => {
  let component: AbsenceCreateComponent;
  let fixture: ComponentFixture<AbsenceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
