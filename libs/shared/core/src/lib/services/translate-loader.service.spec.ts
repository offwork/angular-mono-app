import { TestBed } from '@angular/core/testing';

import { TranslateLoaderService } from './translate-loader.service';

describe('TranslateLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslateLoaderService = TestBed.get(TranslateLoaderService);
    expect(service).toBeTruthy();
  });
});
