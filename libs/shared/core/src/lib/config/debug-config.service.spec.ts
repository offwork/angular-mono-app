import { TestBed } from '@angular/core/testing';

import { DebugConfigService } from './debug-config.service';

describe('DebugConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebugConfigService = TestBed.get(DebugConfigService);
    expect(service).toBeTruthy();
  });
});
