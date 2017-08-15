import { TestBed, inject } from '@angular/core/testing';

import { FamiliaService } from './familia.service';

describe('FamiliaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamiliaService]
    });
  });

  it('should be created', inject([FamiliaService], (service: FamiliaService) => {
    expect(service).toBeTruthy();
  }));
});
