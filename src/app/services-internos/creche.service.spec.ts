import { TestBed, inject } from '@angular/core/testing';

import { CrecheService } from './creche.service';

describe('CrecheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrecheService]
    });
  });

  it('should be created', inject([CrecheService], (service: CrecheService) => {
    expect(service).toBeTruthy();
  }));
});
