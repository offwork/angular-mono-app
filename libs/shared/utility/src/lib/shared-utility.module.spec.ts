import { async, TestBed } from '@angular/core/testing';
import { SharedUtilityModule } from './shared-utility.module';

describe('SharedUtilityModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUtilityModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUtilityModule).toBeDefined();
  });
});
