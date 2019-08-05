import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlbotLayoutComponent } from './slbot-layout.component';

describe('SlbotLayoutComponent', () => {
  let component: SlbotLayoutComponent;
  let fixture: ComponentFixture<SlbotLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlbotLayoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlbotLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
