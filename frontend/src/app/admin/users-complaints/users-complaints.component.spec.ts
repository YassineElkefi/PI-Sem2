import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComplaintsComponent } from './users-complaints.component';

describe('UsersComplaintsComponent', () => {
  let component: UsersComplaintsComponent;
  let fixture: ComponentFixture<UsersComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComplaintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
