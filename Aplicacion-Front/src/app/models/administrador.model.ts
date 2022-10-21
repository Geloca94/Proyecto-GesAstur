import { environment } from "../../environments/environment"

const base_url = environment.base_url;

export class Administrador {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public rol?: string,
        public uid?: string,
    ) { }
    get imagenUrl() {
        //upload/administradores/no-image
        if (this.img) {
            return `${base_url}/upload/administradores/${this.img}`
        }
        return `${base_url}/upload/administradores/no-image`
    }
}

