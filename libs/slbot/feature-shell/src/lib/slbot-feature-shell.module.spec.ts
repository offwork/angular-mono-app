import { async, TestBed } from '@angular/core/testing';
import { SlbotFeatureShellModule } from './slbot-feature-shell.module';

describe('SlbotFeatureShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SlbotFeatureShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SlbotFeatureShellModule).toBeDefined();
  });
});
