import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

//Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarAdministradores } from '../interfaces/cargar-administradores.interface';


import { Administrador } from '../models/administrador.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  public administrador!: Administrador;
  nombre: any;
  email: any;

  constructor(private http: HttpClient,
    private router: Router) { }
  //Procedimiento para validar tu token y que te saque del dasboard


  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.administrador.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }



  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {


    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        const {
          email,
          nombre,
          img,
          password,
          role,
          uid
        } = resp.administrador

        this.administrador = new Administrador(nombre, email, img, password, role, uid)

        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearAdministrador(formData: RegisterForm) {

    return this.http.post(`${base_url}/administradores`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )

  }

  actualizarPerfil(data: { email: string, nombre: string, role: string | undefined }) {

    data = {
      ...data,
      role: this.administrador.role
    }

    return this.http.put(`${base_url}/administradores/${this.uid}`, data, this.headers);

  }



  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  //Para Paginar en una tabla los administradores
  cargarAdministradores(desde: number = 0) {

    //localhost:300'/api/administradores?desde=0
    const url = `${base_url}/administradores?desde=${desde}`;
    return this.http.get<CargarAdministradores>(url, this.headers)
      .pipe(
        delay(500),
        map(resp => {
          console.log(resp);
          const administradores = resp.administradores.map(
            administrador => new Administrador(administrador.nombre, administrador.email, administrador.img, administrador.role, administrador.uid)
          );

          return {
            total: resp.total,
            administradores
          };
        })
      )
  }

  eliminarAdministrador(administrador: Administrador) {

    //administrador/634e3ccdb52cf0ea077cef3f

    const url = `${base_url}/administradores/${administrador.uid}`;
    //Le mando la peticion Delete mas el token en el header
    return this.http.delete(url, this.headers);
    //console.log(url);


  }

  guardarAdministradorRol(administrador: Administrador) {

    return this.http.put(`${base_url}/administradores/${administrador.uid}`, administrador, this.headers);

  }

}
