import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingItemsComponent } from './carpooling-items.component';

describe('CarpoolingItemsComponent', () => {
  let component: CarpoolingItemsComponent;
  let fixture: ComponentFixture<CarpoolingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarpoolingItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarpoolingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
