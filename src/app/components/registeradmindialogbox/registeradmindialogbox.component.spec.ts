import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteradmindialogboxComponent } from './registeradmindialogbox.component';

describe('RegisteradmindialogboxComponent', () => {
  let component: RegisteradmindialogboxComponent;
  let fixture: ComponentFixture<RegisteradmindialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteradmindialogboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteradmindialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
