import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

//MODELO
import { Hospital } from 'src/app/models/hospital.model';

//SERVICIO
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  // Para mostrar los hospitales
  public hospitales: Hospital[] = [];

  // Bandera para saber si cargo o no 
  public cargando: boolean = true;



  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();

  }

  buscar(termino: string) {

    // Si no se escribe nada se vuelve al inicio de la lista
    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    //Introduces el tipo y luego el termino que quieres buscar
    this.busquedasService.buscar('hospitales', termino)
      .subscribe(resp => {

        this.hospitales = resp as Hospital[];
      });
    return
  }

  // Metodo para cargar Hospitales

  cargarHospitales() {

    this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
      })

  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Hospital Actutalizado', hospital.nombre, 'success');
      })
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospital(hospital._id)
      .subscribe(resp => {
        this.cargarHospitales();
        Swal.fire('Hospital Borrado', hospital.nombre, 'success');
      })
  }

  async abrirSweetAlert() {
    const { value } = await Swal.fire({
      icon: 'info',
      input: 'text',
      title: 'Nombre del Hospital',
      text: 'Ingrese el nombre del Hospital',
      inputPlaceholder: 'Introduce el nombre...',
      showCancelButton: true,
    })

    //gracias al Push se actualiza sin recargar la pagina y si lo manda vacio no hace nada
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe((resp: any) =>
          this.hospitales.push(resp.hospital))
    }
  }

  //Modal para ver la imagen antes de subirla cuando la seleccionas 
  abrirModal(hospital: Hospital) {


    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }
}
