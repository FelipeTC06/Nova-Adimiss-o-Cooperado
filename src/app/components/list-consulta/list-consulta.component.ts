import { Cooperado } from '../../types/cooperado';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCooperadoService } from 'src/app/services/api-cooperado.service';

@Component({
  selector: 'app-list-consulta',
  templateUrl: './list-consulta.component.html',
  styleUrls: ['./list-consulta.component.scss']
})
export class ListConsultaComponent implements OnInit {

  formGroup!: FormGroup;
  cooperados?: Cooperado[];
  error?: string;
  cpfPattern = '([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})';
    
  public constructor(
    private cooperadoService: ApiCooperadoService,
    private formBuilder: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();
  }
  
  public createForm() {
    this.formGroup = this.formBuilder.group({
      cpf: [null, [Validators.required, Validators.pattern(this.cpfPattern)]]
    });
  }
  
  public consultaCpf() {
    this.error = undefined;

    if (this.isCpfNull()) {
      this.error = 'required';
      return;
    }

    if (this.isCpfInValid()) {
      this.error = 'pattern';
      return;
    }
    const cpf = this.sanitizeCpf(this.cpfControl?.value);

    this.cooperadoService.getCooperadoByCpf(cpf).subscribe({
      next: (res) => {
        if (!res || Object.keys(res).length === 0) {
          this.error = 'Nenhum cooperado encontrado.';
          return;
        }
        this.cooperados = [res];
      },
      error: (err) => {
        console.log('erro');
      },
    });
  }

  isCpfNull() {
    return !!this.formGroup.get('cpf')?.getError('required');
  }

  isCpfInValid() {
    return !!this.formGroup.get('cpf')?.getError('pattern');
  }
  
  sanitizeCpf(cpf: string) {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '');
  }

  private get cpfControl() {
    const control = this.formGroup.get('cpf');
    return control;
  }
  
}
