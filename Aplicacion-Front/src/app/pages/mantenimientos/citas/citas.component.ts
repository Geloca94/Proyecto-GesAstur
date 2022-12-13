import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/models/cita.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CitaService } from 'src/app/services/cita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [
  ]
})
export class CitasComponent implements OnInit {

  // Para mostrar los citas
  public citas: Cita[] = [];

  constructor(

    private citaService: CitaService,
    private busquedasService: BusquedasService

  ) { }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {

    //this.cargando = true;

    this.citaService.cargarCitas()
      .subscribe(citas => {
        //this.cargando = false;
        console.log(citas)
        this.citas = citas;
      })
  }

  buscar(termino: string) {

    // Si no se escribe nada se vuelve al inicio de la lista
    if (termino.length === 0) {
      return this.cargarCitas();
    }

    //Introduces el tipo y luego el termino que quieres buscar
    this.busquedasService.buscar('citas', termino)
      .subscribe(resp => {

        this.citas = resp as Cita[];
      });
    return
  }

  borrarCita(cita: Cita) {


    Swal.fire({
      title: '¿Estas Seguro?',
      text: `Estas apunto de borrar a ${cita.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.citaService.eliminarCita(cita._id)
          .subscribe(resp => {
            this.cargarCitas();
            Swal.fire(
              'Paciente borrado',
              `${cita.nombre} fue eliminado Correctamente`,
              'success'
            );
          })
      }
    })
    return;
  }

}
