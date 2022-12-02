import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-pacientes',
  templateUrl: './registrar-pacientes.component.html',
  styles: [
  ]
})
export class RegistrarPacientesComponent implements OnInit {

  public pacienteForm: FormGroup | any;
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];

  public hospitalSeleccionado: Hospital | any;
  public medicoSeleccionado: Medico | any;



  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private hospitalService: HospitalService,
    private pacienteService: PacienteService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      descripcion: ['', Validators.required],
      edad: ['', Validators.required],
      dolencia: ['', Validators.required],
      medico: ['', Validators.required],
      hospital: ['', Validators.required],

    })

    this.cargarHospitales();
    this.cargarMedicos();


    //Oberservable para elegir hospital 
    //Con esto al cambiar de hospital seleccionado obtienes su ID

    this.pacienteForm.get('hospital').valueChanges
      .subscribe((hospitalId: any) => {
        console.log(hospitalId)
        //Con esto obtienes el objeto entero del hospital gracias a la id de HospitalId
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
        //console.log(this.hospitalSeleccionado)
      })

    this.pacienteForm.get('medico').valueChanges
      .subscribe((medicoId: any) => {
        console.log(medicoId)
        //Con esto obtienes el objeto entero del hospital gracias a la id de HospitalId
        this.medicoSeleccionado = this.medicos.find(m => m._id === medicoId);
        //console.log(this.hospitalSeleccionado)
      })

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

  guardarPaciente() {

    //Constante con el nombre del paciente que has registrado en la base de datos 
    const { nombre } = this.pacienteForm.value;
    console.log(this.pacienteForm.value);
    this.pacienteService.crearPaciente(this.pacienteForm.value)
      .subscribe(resp => {
        //console.log(resp);
        //Alerta que te salta cuando has creado el paciente 
        Swal.fire('El Paciente', `${nombre} registrado Correctamente`, 'success');
        //para volver a la lista de los pacientes
        //this.router.navigateByUrl(`/dashboard/medicos/listaPaciente`);
      })


  }

}
