import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewUsersComponent } from './overview-users.component';

describe('OverviewUsersComponent', () => {
  let component: OverviewUsersComponent;
  let fixture: ComponentFixture<OverviewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
