import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingDetailsModalComponent } from './carpooling-details-modal.component';

describe('CarpoolingDetailsModalComponent', () => {
  let component: CarpoolingDetailsModalComponent;
  let fixture: ComponentFixture<CarpoolingDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarpoolingDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarpoolingDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
