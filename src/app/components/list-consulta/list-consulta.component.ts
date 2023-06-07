import { Cooperado } from '../../types/cooperado';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCooperadoService } from 'src/app/services/api-cooperado.service';
import { cpf } from 'cpf-cnpj-validator'; // Importe a biblioteca cpf-cnpj-validator com um novo nome

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
      cpf: [null, [Validators.required, Validators.pattern(this.cpfPattern), this.validateCpf]]
    });
  }

  public consultaCpf() {
    this.error = undefined;
    this.cooperados = undefined;

    if (this.isCpfNull()) {
      this.error = 'required';
      return;
    }

    if (this.isCpfInValid()) {
      this.error = 'pattern';
      return;
    }
    const cpfValue = this.sanitizeCpf(this.cpfControl?.value);

    if (!cpf.isValid(cpfValue)) {
      this.error = 'CPF inválido';
      return;
    }

    this.cooperadoService.getCooperadoByCpf(cpfValue).subscribe({
      next: (res) => {
        this.cooperados = [res];
      },
      error: (err) => {
        console.log('Erro na requisição:', err);
        this.error = 'Ocorreu um erro na requisição.';
      },
    });
  }

  public isCpfNull() {
    return !!this.formGroup.get('cpf')?.getError('required');
  }

  public isCpfInValid() {
    return !!this.formGroup.get('cpf')?.getError('pattern');
  }

  public sanitizeCpf(cpf: string) {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '');
  }

  public validateCpf(control: any) {
    if (!control.value) return null;
    const cpfValue = control.value.replace(/\D/g, '');
    if (cpf.isValid(cpfValue)) {
      return null;
    } else {
      return { invalidCpf: true };
    }
  }

  private get cpfControl() {
    const control = this.formGroup.get('cpf');
    return control;
  }

  public preventNonNumericInput(event: KeyboardEvent) {
    const isNumericInput = /^\d*$/.test(event.key);
    const isBackspaceOrDelete = ['Backspace', 'Delete'].includes(event.key);

    if (!isNumericInput && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }


  public maskCpf() {
    let cpf = this.sanitizeCpf(this.cpfControl?.value);
    if (!cpf || cpf.length >= 14) return;
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.formGroup.get('cpf')?.setValue(cpf);
  }



}
