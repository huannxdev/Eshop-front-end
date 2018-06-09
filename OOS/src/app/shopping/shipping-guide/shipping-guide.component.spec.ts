import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingGuideComponent } from './shipping-guide.component';

describe('ShippingGuideComponent', () => {
  let component: ShippingGuideComponent;
  let fixture: ComponentFixture<ShippingGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
