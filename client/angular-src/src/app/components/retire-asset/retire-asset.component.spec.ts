import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetireAssetComponent } from './retire-asset.component';

describe('RetireAssetComponent', () => {
  let component: RetireAssetComponent;
  let fixture: ComponentFixture<RetireAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetireAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetireAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
