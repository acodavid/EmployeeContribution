import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceCreateComponent } from './presence-create.component';

describe('PresenceCreateComponent', () => {
  let component: PresenceCreateComponent;
  let fixture: ComponentFixture<PresenceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
