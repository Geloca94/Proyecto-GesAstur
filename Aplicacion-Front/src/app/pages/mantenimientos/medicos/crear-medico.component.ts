import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//MODELOS
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

//Servicios
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styles: [
  ]
})
export class CrearMedicoComponent implements OnInit {

  public medicoForm: FormGroup | any;
  public hospitales: Hospital[] = [];

  public hospitalSeleccionado: Hospital | any;
  public medicoSeleccionado: Medico | any;

  constructor(

    private fb: FormBuilder,
    private medicoService: MedicoService,
    private hospitalService: HospitalService,
    private router: Router,

  ) {


  }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      hospital: ['', Validators.required],
    })
    this.cargarHospitales();


    //Oberservable para elegir hospital 
    //Con esto al cambiar de hospital seleccionado obtienes su ID

    this.medicoForm.get('hospital').valueChanges
      .subscribe((hospitalId: any) => {
        //console.log(hospitalId)
        //Con esto obtienes el objeto entero del hospital gracias a la id de HospitalId
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
        //console.log(this.hospitalSeleccionado)
      })



  }

  //Metodo para cargar los hospitales y enlistarlos con su respectiva imagen
  cargarHospitales() {

    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        console.log(hospitales)
        this.hospitales = hospitales;
      })

  }
  //metodo para Guardar Medico 
  guardarMedico() {

    //Constante con el nombre del medico que has registrado en la base de datos 
    const { nombre } = this.medicoForm.value;
    //console.log(this.medicoForm.value);
    this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe(resp => {
        //console.log(resp);
        //Alerta que te salta cuando has creado el medico 
        Swal.fire('El Medico', `${nombre} registrado Correctamente`, 'success');
        //para volver a la lista de los medicos
        this.router.navigateByUrl(`/dashboard/medicos`);
      })


  }


}
