import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Paciente } from 'src/app/models/paciente.model';
import { CitaService } from 'src/app/services/cita.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styles: [
  ]
})
export class CrearCitaComponent implements OnInit {


  public citaForm: FormGroup | any;
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];
  public pacientes: Paciente[] = [];

  public hospitalSeleccionado: Hospital | any;
  public medicoSeleccionado: Medico | any;
  public pacienteSeleccionado: Paciente | any;

  constructor(

    private fb: FormBuilder,
    private medicoService: MedicoService,
    private hospitalService: HospitalService,
    private pacienteService: PacienteService,
    private citaService: CitaService,
    private router: Router,


  ) { }

  ngOnInit(): void {

    this.citaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      medico: ['', Validators.required],
      hospital: ['', Validators.required],
      paciente: ['', Validators.required],

    })

    this.cargarHospitales();
    this.cargarMedicos();
    this.cargarPacientes();


    //Oberservable para elegir hospital 
    //Con esto al cambiar de hospital seleccionado obtienes su ID

    this.citaForm.get('hospital').valueChanges
      .subscribe((hospitalId: any) => {
        console.log(hospitalId)
        //Con esto obtienes el objeto entero del hospital gracias a la id de HospitalId
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
        //console.log(this.hospitalSeleccionado)
      })

    this.citaForm.get('medico').valueChanges
      .subscribe((medicoId: any) => {
        console.log(medicoId)
        //Con esto obtienes el objeto entero del hospital gracias a la id de HospitalId
        this.medicoSeleccionado = this.medicos.find(m => m._id === medicoId);
        //console.log(this.Seleccionado)medico
      })

    this.citaForm.get('paciente').valueChanges
      .subscribe((pacienteId: any) => {
        console.log(pacienteId)
        //Con esto obtienes el objeto entero del hospital gracias a la id de HospitalId
        this.pacienteSeleccionado = this.pacientes.find(m => m._id === pacienteId);
        //console.log(this.pacienteSeleccionado)
      })

  }

  cargarPacientes() {
    this.pacienteService.cargarPacientes()
      .subscribe((pacientes: Paciente[]) => {
        console.log(pacientes)
        this.pacientes = pacientes;
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

  guardarCita() {

    //Constante con el nombre del paciente que has registrado en la base de datos 
    const { nombre } = this.citaForm.value;
    console.log(this.citaForm.value);
    this.citaService.crearCitas(this.citaForm.value)
      .subscribe(resp => {
        //console.log(resp);
        //Alerta que te salta cuando has creado el paciente 
        Swal.fire('La Cita', `${nombre} registrado Correctamente`, 'success');
        //para volver a la lista de los pacientes
        //this.router.navigateByUrl(`/dashboard/medicos/listaPaciente`);
      })


  }

}
