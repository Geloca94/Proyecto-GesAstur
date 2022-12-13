import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Administrador } from '../models/administrador.model';
import { Cita } from '../models/cita.model';
import { Hospital } from '../models/hospital.model';
import { Incidencia } from '../models/incidencia.model';
import { Medico } from '../models/medico.model';
import { Paciente } from '../models/paciente.model';

const base_url = environment.base_url;

//SERVICIO CENTRALIZADO PARA BUSCAR MEDICOS ADMINISTRADORES ETC

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  // Metodo privado para no perder las imagenes de los administradores
  private transformarAdministradores(resultados: any[]): Administrador[] {

    return resultados.map(
      administrador => new Administrador(administrador.nombre, administrador.email, '', administrador.img, administrador.google, administrador.uid)
    );

  }

  private transformarHospitales(resultados: any[]): Hospital[] {

    return resultados;

  }

  private transformarMedicos(resultados: any[]): Medico[] {

    return resultados;

  }

  private transformarPacientes(resultados: any[]): Paciente[] {

    return resultados;

  }
  private transformarCitas(resultados: any[]): Cita[] {

    return resultados;

  }

  private transformarIncidencias(resultados: any[]): Incidencia[] {

    return resultados;

  }
  busquedaGlobal(termino: string) {

    const url = `${base_url}/todo//${termino}`;
    return this.http.get<any[]>(url, this.headers);

  }

  buscar(
    tipo: 'administradores' | 'medicos' | 'hospitales' | 'pacientes' | 'citas' | 'incidencias',
    termino: string = ''

  ) {

    //primero la URL luego donde lo quieres buscar y luego el que quieres buscar y en el header le mandas el token
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          //Los Casos que quiero para las busquedas
          switch (tipo) {
            case 'administradores':
              return this.transformarAdministradores(resp.resultados)

            case 'hospitales':
              return this.transformarHospitales(resp.resultados)

            case 'medicos':
              return this.transformarMedicos(resp.resultados)

            case 'pacientes':
              return this.transformarPacientes(resp.resultados)

            case 'citas':
              return this.transformarCitas(resp.resultados)

            case 'incidencias':
              return this.transformarIncidencias(resp.resultados)

            default:
              return [];
          }

        })
      );

  }


}
