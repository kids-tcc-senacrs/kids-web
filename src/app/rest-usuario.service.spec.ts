import { TestBed, inject } from '@angular/core/testing';

import { RestUsuarioService } from './rest-usuario.service';

describe('RestUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestUsuarioService]
    });
  });

  it('should be created', inject([RestUsuarioService], (service: RestUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
