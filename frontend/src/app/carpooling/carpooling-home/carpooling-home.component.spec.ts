import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingHomeComponent } from './carpooling-home.component';

describe('CarpoolingHomeComponent', () => {
  let component: CarpoolingHomeComponent;
  let fixture: ComponentFixture<CarpoolingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarpoolingHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarpoolingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
