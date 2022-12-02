import { environment } from "../../environments/environment"
import { Hospital } from "./hospital.model";
import { Medico } from "./medico.model";

const base_url = environment.base_url;

interface PacienteUser {

    _id: string;
    nombre: string;
    img: string;

}

//Para PODER LISTAR LOS MEDICOS
export interface PacientesInterface {

    ok: boolean;
    pacientes: Paciente[];
    uid: string;

}
//Para buscar el medico
export interface PacienteInterface {

    ok: boolean;
    medico: Paciente;
    uid: string;

}

export class Paciente {

    constructor(
        public nombre: string,
        public apellido: string,
        public descripcion: string,
        public edad: number,
        public dolencia: string,
        public _id: string,
        public medico?: Medico | any,
        public hospital?: Hospital | any

    ) { }
}