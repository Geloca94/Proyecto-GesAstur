import { environment } from "../../environments/environment"

const base_url = environment.base_url;


export interface IncidenciasInterface {

    ok: boolean;
    incidencias: Incidencia[];
    uid: string;

}

export interface IncidenciaInterface {

    ok: boolean;
    medico: Incidencia;
    uid: string;

}

export class Incidencia {

    constructor(
        public nombre: string,
        public tipo: string,
        public descripcion: string,
        public estado: string,
        public _id: string,
        public fecha: Date,
    ) { }

}



