import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Cooperado } from '../types/cooperado';

@Injectable({
  providedIn: 'root'
})
export class ApiCooperadoService {

  private url = environment.apiCooperadoUrl;

  constructor(private http: HttpClient) { }

  public getCooperadoByCpf(cpf: string): Observable<Cooperado> {
    const params = {cpf}
    const apiUrl = `${this.url}/cooperado`;

    return this.http.get<Cooperado[]>(apiUrl, {params}).pipe(
      map((res: Cooperado[]) => {
        return res[0];
      }),
    );
  }

}
