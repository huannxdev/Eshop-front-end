import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCategoriesComponent } from './overview-categories.component';

describe('OverviewCategoriesComponent', () => {
  let component: OverviewCategoriesComponent;
  let fixture: ComponentFixture<OverviewCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
