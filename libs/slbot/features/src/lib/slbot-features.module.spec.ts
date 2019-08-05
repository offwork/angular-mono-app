import { async, TestBed } from '@angular/core/testing';
import { SlbotFeaturesModule } from './slbot-features.module';

describe('SlbotFeaturesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SlbotFeaturesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SlbotFeaturesModule).toBeDefined();
  });
});
