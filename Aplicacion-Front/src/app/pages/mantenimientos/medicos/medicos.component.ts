import { Component, OnInit } from '@angular/core';

import { Medico } from 'src/app/models/medico.model';
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


  // Para mostrar los hospitales
  public medicos: Medico[] = [];

  // Bandera para saber si cargo o no 
  public cargando: boolean = true;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,


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
        console.log(medicos);
      })
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
