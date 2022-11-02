import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/models/administrador.model';
import { AdministradorService } from 'src/app/services/administrador.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: []
})
export class AdministradoresComponent implements OnInit {

  public totalAdministradores: number = 0;
  public administradores: Administrador[] = [];
  //Variable para almacenar los administradores Temporalmente y no perderlos al realizar la busqueda
  public administradoresTemp: Administrador[] = [];

  public desde: number = 0;
  //Esto esto sera para que al cargar administradores te salte el rootacion
  public cargando: boolean = true;

  constructor(
    private administradorService: AdministradorService,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarAdministradores();

  }

  cargarAdministradores() {
    this.cargando = true;
    this.administradorService.cargarAdministradores(this.desde)
      .subscribe(({ total, administradores }) => {
        this.totalAdministradores = total;
        this.administradores = administradores;
        this.administradoresTemp = administradores;
        this.cargando = false;
      })
  }

  //Para la Paginacion
  cambiarPagina(valor: number) {
    this.desde += valor;

    //desde nunca puede ser menor a 0
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalAdministradores) {
      //Si  el total es mayor o igual al total de administradores va ser menos  al valor
      this.desde -= valor;
    }
    this.cargarAdministradores();
  }


  //METODO DE BUSQUEDA!!
  buscar(termino: string) {

    // Si no se escribe nada se vuelve al inicio de la lista
    if (termino.length === 0) {
      return this.administradores = this.administradoresTemp;
    }

    //Introduces el tipo y luego el termino que quieres buscar
    this.busquedasService.buscar('administradores', termino)
      .subscribe(resp => {

        this.administradores = resp;
      });
    return
  }

}
