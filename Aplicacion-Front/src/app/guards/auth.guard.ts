import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';

import { AdministradorService } from '../services/administrador.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //Proteccion de ruta para que te expulse
  constructor(private administradorService: AdministradorService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    this.administradorService.validarToken()

    return this.administradorService.validarToken()
      .pipe(
        tap((estaAutentificado: any) => {
          if (!estaAutentificado) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
