import { TestBed, inject } from '@angular/core/testing';

import { UtilHttpService } from './util-http.service';

describe('RestUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilHttpService]
    });
  });

  it('should be created', inject([UtilHttpService], (service: UtilHttpService) => {
    expect(service).toBeTruthy();
  }));
});
