import { TestBed } from '@angular/core/testing';

import { SerdooApiService } from './serdoo-api.service';

describe('SerdooApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SerdooApiService = TestBed.get(SerdooApiService);
    expect(service).toBeTruthy();
  });
});
