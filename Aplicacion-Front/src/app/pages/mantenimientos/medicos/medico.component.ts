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
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      hospital_id: ['', Validators.required],

    })

    //observable para obtener el id del HOSPITAL
    this.medicoForm.valueChanges
      .subscribe((value: any) => {
        console.log('value changes', value);
        this.hospitalSeleccionado = this.hospitales.find(hospital =>
          hospital._id === value.hospital_id);

        this.medicoSeleccionado = {
          ...this.medicoSeleccionado,
          nombre: value.nombre,
          email: value.email,
          hospital: this.hospitalSeleccionado
        }
        console.log('After value changes', this.medicoSeleccionado, this.hospitalSeleccionado)
      })
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.activateRoute.params
      .subscribe(({ id }) => { this.cargarMedico(id) });

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
    } else {

      this.medicoService.obtenerMedicoPorId(id)
        .subscribe(medico => {

          //Regla de validacion
          if (!medico) {
            this.router.navigateByUrl(`/dashboard/medicos/`)
          }

          this.medicoSeleccionado = medico;
          const medicoFormValue = {
            nombre: medico.nombre,
            email: medico.email,
            hospital_id: medico.hospital._id
          }
          this.medicoForm.setValue(medicoFormValue);
        });
    }
  }

  guardarMedico() {


    this.hospitalSeleccionado = this.hospitales.find(hospital => this.medicoForm.value.hospital_id === hospital._id);

    console.log('Hosp sel', this.hospitalSeleccionado);

    if (this.medicoSeleccionado && this.hospitalSeleccionado) {

      //actualizar
      const medicoToSave = {
        _id: this.medicoSeleccionado._id,
        email: this.medicoForm.value.email,
        nombre: this.medicoForm.value.nombre,
        hospital: this.hospitalSeleccionado._id
      }
      console.log('Medic sel', medicoToSave);
      this.medicoService.actualizarMedico(medicoToSave)
        .subscribe(resp => {
          console.log(resp);
          Swal.fire('Actualizado', `${medicoToSave.nombre} actualizado correctamente`, 'success');

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
