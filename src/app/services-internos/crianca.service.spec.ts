import { TestBed, inject } from '@angular/core/testing';

import { CriancaService } from './crianca.service';

describe('CriancaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CriancaService]
    });
  });

  it('should be created', inject([CriancaService], (service: CriancaService) => {
    expect(service).toBeTruthy();
  }));
});
