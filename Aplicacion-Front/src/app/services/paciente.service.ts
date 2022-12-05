import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';


import { Paciente, PacientesInterface, PacienteInterface } from '../models/paciente.model';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

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

  cargarPacientes() {
    const url = `${base_url}/medicos/listaPaciente`;
    return this.http.get<PacientesInterface>(url, this.headers)
      .pipe(
        map((resp: PacientesInterface) => resp.pacientes)
      );
  }

  crearPaciente(paciente: { nombre: string, apellido: string, descripcion: string, edad: number, dolencia: string, medico: string, hospital: string }) {

    const url = `${base_url}/medicos/registrarPaciente`;
    return this.http.post(url, paciente, this.headers);


  }
  //Instruccion para actualizar el medico en la base de datos (enlaza el front con el back)
  actualizarPaciente(paciente: any) {

    const url = `${base_url}/medicos/actualizarPaciente/${paciente._id}`;
    return this.http.put(url, paciente, this.headers);

  }


  eliminarPaciente(_id: string) {

    const url = `${base_url}/medicos/listaPaciente/${_id}`;
    return this.http.delete(url, this.headers);

  }

  obtenerPacientesPorId(_id: string) {

    const url = `${base_url}/medicos/paciente/${_id}`;
    return this.http.get<PacienteInterface>(url, this.headers)
      .pipe(
        map((resp: PacienteInterface) => resp.paciente)
      );
  }


}
