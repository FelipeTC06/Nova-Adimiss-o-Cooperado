import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiCooperadoService } from './api-cooperado.service';
import { Cooperado } from '../types/cooperado'; // Importe o tipo Cooperado corretamente

describe('ApiCooperadoService', () => {
  let service: ApiCooperadoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiCooperadoService]
    });

    service = TestBed.inject(ApiCooperadoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve cooperado by cpf', () => {
    const cpf = '17875662770';
    const cooperadoMock: Cooperado = {
      id: 2,
      cpf: '17875662770',
      name: 'Cardi my',
      status: 'regular',
      contaCorrente: 333333-2,
      contaAplicacao: 444444-2
    };

    service.getCooperadoByCpf(cpf).subscribe(cooperado => {
      expect(cooperado).toEqual(cooperadoMock);
    });

    const req = httpMock.expectOne(`${service.url}/cooperado?cpf=${cpf}`);
    expect(req.request.method).toBe('GET');
    req.flush([cooperadoMock]);
  });
});
