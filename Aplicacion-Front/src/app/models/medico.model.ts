import { environment } from "../../environments/environment"
import { Hospital } from "./hospital.model";

const base_url = environment.base_url;

interface _MedicoUser {

    _id: string;
    nombre: string;
    img: string;

}

export interface MedicosInterface {

    ok: boolean;
    medicos: Medico[];
    uid: string;

}

export interface MedicoInterface {

    ok: boolean;
    medico: Medico;
    uid: string;

}

export class Medico {

    constructor(
        public nombre: string,
        public img: string,
        public email: string,
        public _id: string,
        public usuario?: _MedicoUser,
        public hospital?: Hospital | any

    ) { }
}