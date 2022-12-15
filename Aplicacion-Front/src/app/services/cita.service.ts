import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CitaInterface, CitasInterface } from '../models/cita.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(
    private http: HttpClient
  ) { }

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

  crearCitas(cita: { nombre: string, descripcion: string, fecha: Date, asistencia: boolean, medico: string, hospital: string, paciente: string }) {

    const url = `${base_url}/citas`;
    return this.http.post(url, cita, this.headers);

  }

  cargarCitas() {
    const url = `${base_url}/citas`;
    return this.http.get<CitasInterface>(url, this.headers)
      .pipe(
        map((resp: CitasInterface) => resp.citas)
      );
  }

  obtenerCitasPorId(_id: string) {

    const url = `${base_url}/citas/${_id}`;
    return this.http.get<CitaInterface>(url, this.headers)
      .pipe(
        map((resp: CitaInterface) => resp.cita)
      );
  }

  eliminarCita(_id: string) {

    const url = `${base_url}/citas/${_id}`;
    return this.http.delete(url, this.headers);

  }

}
