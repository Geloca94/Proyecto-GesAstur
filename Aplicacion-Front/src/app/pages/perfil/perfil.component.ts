import { Component, OnInit } from '@angular/core';
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
  public imagenSubir: File | undefined;


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
        //Chapuza para que recargue la pagina
        window.location.href = window.location.href;
      })
  }

  cambiarImagen(event: any) {
    //CambiarImagen(file:File)
    console.log(event);

  }
}
