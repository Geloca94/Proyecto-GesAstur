import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/models/administrador.model';
import { AdministradorService } from 'src/app/services/administrador.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public administrador: Administrador;
  public totalAdministradores: number = 0;
  public administradores: Administrador[] = [];
  //Variable para almacenar los administradores Temporalmente y no perderlos al realizar la busqueda
  public administradoresTemp: Administrador[] = [];

  public desde: number = 0;

  constructor(
    private modalImagenService: ModalImagenService,
    private administradorService: AdministradorService,

    private router: Router) {
    this.administrador = administradorService.administrador;

  }


  logout() {
    this.administradorService.logout();
  }
  cargarAdministradores() {
    this.administradorService.cargarAdministradores(this.desde)
      .subscribe(({ total, administradores }) => {
        this.totalAdministradores = total;
        this.administradores = administradores;
        this.administradoresTemp = administradores;
        console.log(this.administradores)
      })
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




