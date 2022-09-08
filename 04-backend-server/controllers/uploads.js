const path = require('path')
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar Tipos
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No selecciono el tipo correcto'
        });
    }

    //Validar Que exista un archivo
    //Si no envio ningun archivo salta el res.estatus
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se envio ningun archivo'
        });
    }

    //Procesar la Imagen..
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); // Ejemplo imagen.1.2.jpg asi creas un arreglo
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar Extension.. CUIDADO CON LAS EXTENSIONES EN MAYUSCULA
    const extensionesValidas = ['png', 'JPG', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension correcta'
        });

    }

    // Generar el nombre del archivo 
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para generar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen

    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos 
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo Subido',
            nombreArchivo,
        });

    });




}


const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    // Imagen si no existe la imagen del usuario
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/noImg.jpg`)
        res.sendFile(pathImg);
    }


}

module.exports = {
    fileUpload,
    retornaImagen
};
