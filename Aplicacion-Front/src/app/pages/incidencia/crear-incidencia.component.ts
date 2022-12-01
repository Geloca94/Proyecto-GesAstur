import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Incidencia } from 'src/app/models/incidencia.model';
import { IncidenciaService } from 'src/app/services/incidencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-incidencia',
  templateUrl: './crear-incidencia.component.html',
  styles: [
  ]
})
export class CrearIncidenciaComponent implements OnInit {

  public incidenciaForm: FormGroup | any;

  constructor(

    private fb: FormBuilder,
    private incidenciaService: IncidenciaService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.incidenciaForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  crearIncidencia() {

    //Constante con el nombre del medico que has registrado en la base de datos 
    const { nombre } = this.incidenciaForm.value;
    //console.log(this.medicoForm.value);
    this.incidenciaService.crearIncidencia(this.incidenciaForm.value)
      .subscribe(resp => {
        //console.log(resp);
        //Alerta que te salta cuando has creado el medico 
        Swal.fire('La Incidencia', `${nombre} reportada Correctamente `, 'success');
        //para volver a la lista de los medicos
        this.router.navigateByUrl(`/dashboard`);
      })


  }

}
