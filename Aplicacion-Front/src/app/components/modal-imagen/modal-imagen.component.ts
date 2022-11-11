import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = null;


  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();

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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    //Le paso la imagen que quiero subir donde quiero subirla y la uid de quien quiero subirla

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id);
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 500);

  }
}
