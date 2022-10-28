import { Administrador } from "../models/administrador.model";

export interface CargarAdministradores {
    total: number;
    administradores: Administrador[];
}