import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAssetComponent } from './checkout-asset.component';

describe('CheckoutAssetComponent', () => {
  let component: CheckoutAssetComponent;
  let fixture: ComponentFixture<CheckoutAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
