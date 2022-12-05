import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Paciente } from 'src/app/models/paciente.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-actualizar-paciente',
  templateUrl: './actualizar-paciente.component.html',
  styles: [
  ]
})
export class ActualizarPacienteComponent implements OnInit {

  public pacienteForm: FormGroup | any;
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];
  public hospitalSeleccionado: Hospital | any;
  public medicoSeleccionado: Medico | any;
  public pacienteSeleccionado: Paciente | any;


  constructor(

    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private router: Router,
    private activateRoute: ActivatedRoute) {

    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      descripcion: ['', Validators.required],
      edad: ['', Validators.required],
      dolencia: ['', Validators.required],
      medico_id: ['', Validators.required],
      hospital_id: ['', Validators.required],

    })

    //observable para obtener el id del HOSPITAL
    this.pacienteForm.valueChanges
      .subscribe((value: any) => {
        console.log('value changes', value);
        this.medicoSeleccionado = this.medicos.find(medico =>
          medico._id === value.medico_id);
        this.hospitalSeleccionado = this.hospitales.find(hospital =>
          hospital._id === value.hospital_id);

        this.pacienteSeleccionado = {
          ...this.pacienteSeleccionado,
          nombre: value.nombre,
          apellido: value.apellido,
          descripcion: value.descripcion,
          edad: value.edad,
          dolencia: value.dolencia,
          medico: this.medicoSeleccionado,
          hospital: this.hospitalSeleccionado
        }
        console.log('After value changes', this.pacienteSeleccionado, this.medicoSeleccionado, this.hospitalSeleccionado)
      })


  }

  ngOnInit(): void {

    this.cargarMedicos();
    this.cargarHospitales();
    this.activateRoute.params
      .subscribe(({ id }) => { this.cargarPaciente(id) });

  }

  cargarMedicos() {

    this.medicoService.cargarMedicos()
      .subscribe((medicos: Medico[]) => {
        console.log(medicos)
        this.medicos = medicos;
      })

  }

  cargarHospitales() {

    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        console.log(hospitales)
        this.hospitales = hospitales;
      })

  }




  cargarPaciente(id: string) {

    this.pacienteService.obtenerPacientesPorId(id)
      .subscribe(paciente => {

        //Regla de validacion
        /*if (!paciente) {
          this.router.navigateByUrl(`/dashboard/medicos/listaPaciente`)
        }*/

        this.pacienteSeleccionado = paciente;
        const pacienteFormValue = {
          nombre: paciente.nombre,
          apellido: paciente.apellido,
          descripcion: paciente.descripcion,
          edad: paciente.edad,
          dolencia: paciente.dolencia,
          medico_id: paciente.medico._id,
          hospital_id: paciente.hospital._id
        }
        this.pacienteForm.setValue(pacienteFormValue);
      });
  }

  guardarPaciente() {

    this.medicoSeleccionado = this.medicos.find(medico => this.pacienteForm.value.medico_id === medico._id);
    this.hospitalSeleccionado = this.hospitales.find(hospital => this.pacienteForm.value.hospital_id === hospital._id);

    console.log('Medic sel', this.medicoSeleccionado);
    console.log('Hosp sel', this.hospitalSeleccionado);

    if (this.pacienteSeleccionado && this.medicoSeleccionado && this.hospitalSeleccionado) {

      //actualizar
      const pacienteToSave = {
        _id: this.pacienteSeleccionado._id,
        nombre: this.pacienteForm.value.nombre,
        apellido: this.pacienteForm.value.apellido,
        descripcion: this.pacienteForm.value.descripcion,
        edad: this.pacienteForm.value.edad,
        dolencia: this.pacienteForm.value.dolencia,
        medico_id: this.medicoSeleccionado._id,
        hospital_id: this.hospitalSeleccionado._id
      }
      console.log('Medic sel', pacienteToSave);
      this.pacienteService.actualizarPaciente(pacienteToSave)
        .subscribe(resp => {
          console.log(resp);
          Swal.fire('Actualizado', `${pacienteToSave.nombre} actualizado correctamente`, 'success');
          //para volver a la lista de los medicos
          //this.router.navigateByUrl(`/dashboard/medicos/listaPaciente`);

        })

    }

  }

}
