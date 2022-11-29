import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador.model';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public administrador: Administrador;

  constructor(
    private administradorService: AdministradorService,
    private router: Router) {
    this.administrador = administradorService.administrador;

  }

  logout() {
    this.administradorService.logout();
  }

  buscar(termino: string) {
    //termino es lo que escribes en el buscador

    //Si no pones nada y das a buscar te manda a la pantalla principal
    if (termino.length === 0) {
      this.router.navigateByUrl('/dashboard')
    } else {
      //Con esto concaquetas el buscador con la url para ir a la pagina donde imprimir lo buscado
      this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
    }
  }
}




