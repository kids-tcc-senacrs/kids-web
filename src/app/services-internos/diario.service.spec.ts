import { TestBed, inject } from '@angular/core/testing';

import { DiarioService } from './diario.service';

describe('DiarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiarioService]
    });
  });

  it('should be created', inject([DiarioService], (service: DiarioService) => {
    expect(service).toBeTruthy();
  }));
});
