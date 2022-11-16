import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

//El pipe sirve para transformar la forma visual como recibo la informacion
//Es decir si recibo un string lo transformo de manera visual sin modificar el objeto

const base_url = environment.base_url

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'administradores' | 'medicos' | 'hospitales'): string {

    if (!img) {
      return `${base_url}/upload/administradores/no-image`
    }
    else if (img) {
      return `${base_url}/upload/${tipo}/${img}`
    }
    return `${base_url}/upload/administradores/no-image`

  }

}
