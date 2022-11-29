import { Component, OnInit } from '@angular/core';

import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {


  // Para mostrar los medicos
  public medicos: Medico[] = [];

  // Bandera para saber si cargo o no 
  public cargando: boolean = true;


  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService


  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {

    this.cargando = true;

    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
      })
  }
  buscar(termino: string) {

    // Si no se escribe nada se vuelve al inicio de la lista
    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    //Introduces el tipo y luego el termino que quieres buscar
    this.busquedasService.buscar('medicos', termino)
      .subscribe(resp => {

        this.medicos = resp as Medico[];
      });
    return
  }

  abrirModal(medico: Medico) {

    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);


  }

  eliminarMedico(medico: Medico) {


    Swal.fire({
      title: '¿Estas Seguro?',
      text: `Estas apunto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico._id)
          .subscribe(resp => {
            this.cargarMedicos();
            Swal.fire(
              'Usuario borrado',
              `${medico.nombre} fue eliminado Correctamente`,
              'success'
            );
          })
      }
    })
    return;
  }

}
