import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryEditOfferComponent } from './delivery-edit-offer.component';

describe('DeliveryEditOfferComponent', () => {
  let component: DeliveryEditOfferComponent;
  let fixture: ComponentFixture<DeliveryEditOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryEditOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryEditOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
