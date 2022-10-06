import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //Proteccion de ruta para que te expulse
  constructor(private usuarioService: UsuarioService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    this.usuarioService.validarToken()

    return this.usuarioService.validarToken()
      .pipe(
        tap((estaAutentificado: any) => {
          if (!estaAutentificado) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
