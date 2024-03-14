import { TestBed } from '@angular/core/testing';

import { ScriptLoaderService } from './script-loader.service';

describe('ScriptLoaderService', () => {
  let service: ScriptLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
