import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionCreateComponent } from './contribution-create.component';

describe('ContributionCreateComponent', () => {
  let component: ContributionCreateComponent;
  let fixture: ComponentFixture<ContributionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
