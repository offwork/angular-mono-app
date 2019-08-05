import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarActionComponent } from './sidebar-action.component';

describe('SidebarActionComponent', () => {
  let component: SidebarActionComponent;
  let fixture: ComponentFixture<SidebarActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarActionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
