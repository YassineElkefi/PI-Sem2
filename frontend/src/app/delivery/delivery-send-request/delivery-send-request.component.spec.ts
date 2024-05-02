import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySendRequestComponent } from './delivery-send-request.component';

describe('DeliverySendRequestComponent', () => {
  let component: DeliverySendRequestComponent;
  let fixture: ComponentFixture<DeliverySendRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliverySendRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliverySendRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
