import { environment } from "../../environments/environment"

const base_url = environment.base_url;

export class Administrador {

    constructor(
        public nombre: string,
        public email: string,
        public img: string,
        public password?: string,
        public role?: string,
        public uid?: string,
        //public google?: boolean,
    ) { }

    get imagenUrl() {

        if (this.img) {
            return `${base_url}/upload/administradores/${this.img}`
        }
        return `${base_url}/upload/administradores/no-image`
    }
}

