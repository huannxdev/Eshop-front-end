import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistAccountComponent } from './wishlist-account.component';

describe('WishlistAccountComponent', () => {
  let component: WishlistAccountComponent;
  let fixture: ComponentFixture<WishlistAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
