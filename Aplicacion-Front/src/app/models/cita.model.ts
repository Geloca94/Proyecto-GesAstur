import { environment } from "../../environments/environment"
import { Hospital } from "./hospital.model";
import { Medico } from "./medico.model";
import { Paciente } from "./paciente.model";

const base_url = environment.base_url;

interface citaUser {

    _id: string;
    nombre: string;
}

//Para PODER LISTAR Las Citas
export interface CitasInterface {

    ok: boolean;
    citas: Cita[];
    uid: string;

}
//Para buscar el medico
export interface CitaInterface {

    ok: boolean;
    cita: Cita;
    uid: string;

}

export class Cita {

    constructor(
        public nombre: string,
        public descripcion: string,
        public fecha: Date,
        public asistencia: boolean,
        public _id: string,
        public medico?: Medico | any,
        public hospital?: Hospital | any,
        public paciente?: Paciente | any
    ) { }
}