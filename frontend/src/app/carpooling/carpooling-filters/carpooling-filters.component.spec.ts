import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingFiltersComponent } from './carpooling-filters.component';

describe('CarpoolingFiltersComponent', () => {
  let component: CarpoolingFiltersComponent;
  let fixture: ComponentFixture<CarpoolingFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarpoolingFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarpoolingFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
