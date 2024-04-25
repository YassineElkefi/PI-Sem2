import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfferModalComponent } from './post-offer-modal.component';

describe('PostOfferModalComponent', () => {
  let component: PostOfferModalComponent;
  let fixture: ComponentFixture<PostOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostOfferModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
