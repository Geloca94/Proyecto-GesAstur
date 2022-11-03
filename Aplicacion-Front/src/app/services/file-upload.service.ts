import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  //Puedo hacerlo asincrono

  async sactualizarFoto(
    archivo: File,
    tipo: 'administradores' | 'medicos' | 'hospitales',
    id: string
  ) {

    try {
      //Aqui montas la url
      const url = `${base_url}/upload/${tipo}/${id}`;
      //Aqui cargas la informacion para el back
      const formData = new FormData();
      //Cargo la imagen seguida del archivo se puede hacer cuantas propiedades necesites
      formData.append('imagen', archivo);

      //Almaceno la peticion en una variable fetch es propio de js defino las propiedades
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      //Si quieres ver la back
      //console.log(data);
      if (data.ok) {
        return data.nombreArchivo
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {

      console.log(error)
      return false
    }


  }
}
