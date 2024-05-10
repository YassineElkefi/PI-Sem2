import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersRequestsComponent } from './offers-requests.component';

describe('OffersRequestsComponent', () => {
  let component: OffersRequestsComponent;
  let fixture: ComponentFixture<OffersRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffersRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffersRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
