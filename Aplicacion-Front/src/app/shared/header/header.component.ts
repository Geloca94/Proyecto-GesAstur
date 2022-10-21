import { Component, OnInit } from '@angular/core';
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

  constructor(private administradorService: AdministradorService) {
    this.administrador = administradorService.administrador;

  }

  logout() {
    this.administradorService.logout();
  }




}
function logout() {
  throw new Error('Function not implemented.');
}

