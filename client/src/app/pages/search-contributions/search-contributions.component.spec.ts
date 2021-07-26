import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContributionsComponent } from './search-contributions.component';

describe('SearchContributionsComponent', () => {
  let component: SearchContributionsComponent;
  let fixture: ComponentFixture<SearchContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchContributionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
