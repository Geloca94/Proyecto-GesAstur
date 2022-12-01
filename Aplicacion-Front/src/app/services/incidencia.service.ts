import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Incidencia, IncidenciasInterface, IncidenciaInterface } from '../models/incidencia.model';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarIncidencia() {

    const url = `${base_url}/incidencias`;
    return this.http.get<IncidenciasInterface>(url, this.headers)
      .pipe(
        map((resp: IncidenciasInterface) => resp.incidencias)
      );

  }

  obtenerIncidenciaPorId(id: string) {

    const url = `${base_url}/incidencias/${id}`;
    return this.http.get<IncidenciaInterface>(url, this.headers)
      .pipe(
        map((resp: IncidenciaInterface) => resp.medico)
      );
  }

  //Instrucion para crear La Incidencia en la base datos. 
  crearIncidencia(incidencia: { nombre: string, tipo: string, descripcion: string }) {

    const url = `${base_url}/incidencias`;
    return this.http.post(url, incidencia, this.headers);


  }


  eliminarIncidencia(_id: string) {

    const url = `${base_url}/incidencias/${_id}`;
    return this.http.delete(url, this.headers);

  }
}
