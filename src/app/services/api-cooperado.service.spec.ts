import { TestBed } from '@angular/core/testing';

import { ApiCooperadoService } from './api-cooperado.service';

describe('ApiCooperadoService', () => {
  let service: ApiCooperadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCooperadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
