import { Component, OnInit } from '@angular/core';
import { Incidencia } from 'src/app/models/incidencia.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { IncidenciaService } from 'src/app/services/incidencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styles: [
  ]
})
export class IncidenciaComponent implements OnInit {

  public incidencias: Incidencia[] = [];

  constructor(
    private incidenciaService: IncidenciaService,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {

    this.cargarIncidencias();
  }

  cargarIncidencias() {


    this.incidenciaService.cargarIncidencia()
      .subscribe(incidencias => {
        this.incidencias = incidencias;
        console.log(incidencias)
      })
  }

  eliminarIncidencia(incidencia: Incidencia) {


    Swal.fire({
      title: '¿Estas Seguro?',
      text: `Estas apunto de borrar a ${incidencia.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.incidenciaService.eliminarIncidencia(incidencia._id)
          .subscribe(resp => {
            this.cargarIncidencias();
            Swal.fire(
              'Medico borrado',
              `${incidencia.nombre} fue eliminado Correctamente`,
              'success'
            );
          })
      }
    })
    return;
  }

  buscar(termino: string) {

    // Si no se escribe nada se vuelve al inicio de la lista
    if (termino.length === 0) {
      return this.cargarIncidencias();
    }

    //Introduces el tipo y luego el termino que quieres buscar
    this.busquedasService.buscar('incidencias', termino)
      .subscribe(resp => {

        this.incidencias = resp as Incidencia[];
      });
    return
  }

}
