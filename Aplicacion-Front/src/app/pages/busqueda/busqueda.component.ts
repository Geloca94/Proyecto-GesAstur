import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Administrador } from 'src/app/models/administrador.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  //Importo mis 3 modelos

  public administradores: Administrador[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService) {

  }

  ngOnInit(): void {

    //Se maneja como una subscripcion porque puede psar que estemos en la misma pantalla 
    this.activatedRoute.params
      .subscribe(({ termino }) => {

        this.busquedaGlobal(termino)
        //console.log(termino)
      })

  }

  busquedaGlobal(termino: string) {

    this.busquedasService.busquedaGlobal(termino)
      .subscribe((resp: any) => {
        console.log(resp)
        //Aqui tengo los arreglos que usare en el html
        this.administradores = resp.administradores;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      })

  }


}
