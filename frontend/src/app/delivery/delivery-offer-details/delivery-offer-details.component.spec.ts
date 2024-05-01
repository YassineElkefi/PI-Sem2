import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOfferDetailsComponent } from './delivery-offer-details.component';

describe('DeliveryOfferDetailsComponent', () => {
  let component: DeliveryOfferDetailsComponent;
  let fixture: ComponentFixture<DeliveryOfferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryOfferDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
