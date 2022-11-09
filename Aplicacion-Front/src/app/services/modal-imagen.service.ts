import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: String | undefined;
  public id: String | undefined;
  public img: String | undefined;

  constructor() { }



  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'administradores' | 'medicos' | 'hospitales' | 'pacientes',
    id: string,
    img: string = 'no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    //this.img = img;
    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload${tipo}/${img}`;
    }
    //http://localhost:3000/api/upload/administrador/2577545a-e3d9-4815-b4cb-0a4708c2ef41.JPG
  }

  cerrarModal() {
    this._ocultarModal = true;
  }


}
