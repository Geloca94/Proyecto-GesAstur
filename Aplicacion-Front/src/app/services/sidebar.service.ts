import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Mantenimientoss',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'PaginaPrincipal', url: '/' },
        { titulo: 'Administradores', url: 'administradores' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Medicos', url: 'medicos' },
        { titulo: 'Pacientes', url: 'medicos/listaPaciente' },
        { titulo: 'Citas', url: 'listarCitas' },

      ]
    },

    /*
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [

        { titulo: 'Grafica', url: 'grafica1' },
        { titulo: 'rxjs', url: 'rxjs' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'ProgressBar', url: 'progress' },

      ]
    }
*/
  ];

  constructor() { }
}
