import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddOfferComponent } from './delivery-add-offer.component';

describe('DeliveryAddOfferComponent', () => {
  let component: DeliveryAddOfferComponent;
  let fixture: ComponentFixture<DeliveryAddOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryAddOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryAddOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
