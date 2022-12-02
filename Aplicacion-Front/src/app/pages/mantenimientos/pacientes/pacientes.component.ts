import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: [
  ]
})
export class PacientesComponent implements OnInit {


  // Para mostrar los Pacientes
  public pacientes: Paciente[] = [];


  constructor(

    private pacienteService: PacienteService,
    private busquedasService: BusquedasService


  ) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {

    //this.cargando = true;

    this.pacienteService.cargarPacientes()
      .subscribe(pacientes => {
        //this.cargando = false;
        console.log(pacientes)
        this.pacientes = pacientes;
      })
  }

  buscar(termino: string) {

    // Si no se escribe nada se vuelve al inicio de la lista
    if (termino.length === 0) {
      return this.cargarPacientes();
    }

    //Introduces el tipo y luego el termino que quieres buscar
    this.busquedasService.buscar('pacientes', termino)
      .subscribe(resp => {

        this.pacientes = resp as Paciente[];
      });
    return
  }

  borrarPaciente(paciente: Paciente) {


    Swal.fire({
      title: '¿Estas Seguro?',
      text: `Estas apunto de borrar a ${paciente.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.eliminarPaciente(paciente._id)
          .subscribe(resp => {
            this.cargarPacientes();
            Swal.fire(
              'Paciente borrado',
              `${paciente.nombre} fue eliminado Correctamente`,
              'success'
            );
          })
      }
    })
    return;
  }



}
