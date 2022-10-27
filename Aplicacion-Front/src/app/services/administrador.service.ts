import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
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
          google,
          nombre,
          role,
          img = '',
          uid
        } = resp.administrador

        this.administrador = new Administrador(nombre, email, '', img, google, role, uid)

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
    return this.http.put(`${base_url}/administradores/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }



  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }





}
