import { Target } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormRecord, Validators } from '@angular/forms';
import { AdministradorService } from 'src/app/services/administrador.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [

  ]

})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public administrador: AdministradorService;
  public imagenSubir!: File;
  public imgTemp: any = null;



  constructor(
    private fb: FormBuilder,
    private administradorService: AdministradorService,
    private fileUploadService: FileUploadService) {
    this.administrador = administradorService;

    //PROBLEMA AL AÑADIR ADMINISTRADORSERVICE.USUARIO

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.administrador.nombre, Validators.required],
      email: [this.administrador.email, [Validators.required, Validators.email]],
    })

  }

  actualizarPerfil() {

    this.administradorService.actualizarPerfil(this.perfilForm.value)
      .subscribe(() => {
        //Estraigo el nombre y el email
        const { nombre, email } = this.perfilForm.value;
        this.administrador.nombre = nombre;
        this.administrador.email = email;


        //Funcion para recargar la pagina
        /* setTimeout(() => {
           window.location.href = window.location.href;
         }, 500);*/

      }, (err) => {
        Swal.fire('No se pudo guardar los cambios', err.error.msg, 'error');
      });
  }

  cambiarImagen(event: any) {
    //Intente meterlo en el html pero no era una propiedad asi que lo inserte directamente por detras
    const file = event.target.files[0];

    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    return

  }

  subirImagen() {
    //Le paso la imagen que quiero subir donde quiero subirla y la uid de quien quiero subirla
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'administradores', this.administrador.uid);
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 500);

  }
}
