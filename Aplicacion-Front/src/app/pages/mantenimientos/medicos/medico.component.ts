import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup | any;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital | any;
  public medicoSeleccionado: Medico | any;


  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activateRoute.params
      .subscribe(({ id }) => { this.cargarMedico(id) });


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      hospital: ['', Validators.required],

    })

    this.cargarHospitales();

    //observable para obtener el id del HOSPITAL
    this.medicoForm.get('hospital').valueChanges
      .subscribe((hospitalId: any) => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);

      })
  }



  cargarHospitales() {

    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        //console.log(hospitales)
        this.hospitales = hospitales;
      })

  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
      .subscribe(medico => {

        //Regla de validacion
        if (!medico) {
          this.router.navigateByUrl(`/dashboard/medicos/`)
        }

        console.log(medico)
        const hospital = medico.hospital?._id;
        console.log(hospital)

        const { nombre, email } = medico;
        console.log(nombre, email, hospital)
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, email, hospital });
      });

  }

  guardarMedico() {

    const { nombre } = this.medicoForm.value

    if (this.medicoSeleccionado) {
      //actualizar
      const data = {
        ...this.medicoForm,
        _id: this.medicoSeleccionado.hospital
      }
      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          console.log(resp);
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');

        })

    } else {
      //crear
      const { nombre } = this.medicoForm.value
      console.log(this.medicoForm.value)
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire('Creado', `${nombre} registrado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        })
    }


  }
}
