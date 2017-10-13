import { TestBed, inject } from '@angular/core/testing';

import { ApiRestGenericaService } from './api-rest-generica.service';

describe('ApiRestGenericaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRestGenericaService]
    });
  });

  it('should be created', inject([ApiRestGenericaService], (service: ApiRestGenericaService) => {
    expect(service).toBeTruthy();
  }));
});
