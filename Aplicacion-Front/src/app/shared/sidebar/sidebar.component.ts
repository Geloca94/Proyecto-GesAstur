import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/models/administrador.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public administrador: Administrador;

  constructor(private sidebarService: SidebarService,
    private administradorService: AdministradorService
  ) {
    this.menuItems = sidebarService.menu;
    this.administrador = administradorService.administrador;
  }

  ngOnInit(): void {
  }

}
