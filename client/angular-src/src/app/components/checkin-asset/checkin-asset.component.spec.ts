import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinAssetComponent } from './checkin-asset.component';

describe('CheckinAssetComponent', () => {
  let component: CheckinAssetComponent;
  let fixture: ComponentFixture<CheckinAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
