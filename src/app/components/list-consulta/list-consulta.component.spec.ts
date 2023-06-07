import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ListConsultaComponent } from './list-consulta.component';
import { ApiCooperadoService } from 'src/app/services/api-cooperado.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Cooperado } from 'src/app/types/cooperado';

describe('ListConsultaComponent', () => {
  let component: ListConsultaComponent;
  let fixture: ComponentFixture<ListConsultaComponent>;
  let mockCooperadoService: jasmine.SpyObj<ApiCooperadoService>;

  beforeEach(() => {
    mockCooperadoService = jasmine.createSpyObj('ApiCooperadoService', ['getCooperadoByCpf']);
    
    TestBed.configureTestingModule({
      declarations: [ListConsultaComponent],
      providers: [
        FormBuilder,
        { provide: ApiCooperadoService, useValue: mockCooperadoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListConsultaComponent);
    component = fixture.componentInstance;
    component.formGroup = TestBed.inject(FormBuilder).group({
      cpf: [null]
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service method on consultaCpf', fakeAsync(() => {
    const mockCooperado: Cooperado = {       
      id: 1,
      cpf: '18672943708',
      status: 'active',
      contaCorrente: 111111,
      contaAplicacao: 222222,
      name: 'Felipe Torres Cresto'
    };
    mockCooperadoService.getCooperadoByCpf.and.returnValue(of(mockCooperado));
  
    component.consultaCpf();
    tick();
    fixture.detectChanges();
  
    expect(component.cooperados).toBeUndefined([mockCooperado]);
    expect(component.error).toBeTruthy();
  }));
  
  it('should handle error on consultaCpf', fakeAsync(() => {
    const mockError = new Error('Mock error');
    mockCooperadoService.getCooperadoByCpf.and.returnValue(throwError(mockError));
  
    component.consultaCpf();
    tick(); 
    fixture.detectChanges();
  
    expect(component.cooperados).toBeUndefined();
    expect(component.error).toBeTruthy();
  }));
  
});
