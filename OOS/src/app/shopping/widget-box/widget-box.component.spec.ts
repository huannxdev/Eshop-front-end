import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetBoxComponent } from './widget-box.component';

describe('WidgetBoxComponent', () => {
  let component: WidgetBoxComponent;
  let fixture: ComponentFixture<WidgetBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
