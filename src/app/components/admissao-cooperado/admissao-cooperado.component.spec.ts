import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissaoCooperadoComponent } from './admissao-cooperado.component';

describe('AdmissaoCooperadoComponent', () => {
  let component: AdmissaoCooperadoComponent;
  let fixture: ComponentFixture<AdmissaoCooperadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissaoCooperadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissaoCooperadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
