import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingEditOfferComponent } from './carpooling-edit-offer.component';

describe('CarpoolingEditOfferComponent', () => {
  let component: CarpoolingEditOfferComponent;
  let fixture: ComponentFixture<CarpoolingEditOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarpoolingEditOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarpoolingEditOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
