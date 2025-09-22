import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleOAuthComponent } from './google-oauth.component';

describe('GoogleOAuthComponent', () => {
  let component: GoogleOAuthComponent;
  let fixture: ComponentFixture<GoogleOAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleOAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleOAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
