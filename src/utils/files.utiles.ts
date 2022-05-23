import {UploadedFile} from "express-fileupload"

function generarNumeroAleatorio(){
    return Math.floor(Math.random()*2342398923589)
}

export async function guardarImagen(imagen:UploadedFile){
    imagen.name="imagen"+generarNumeroAleatorio()+".png"

    await imagen.mv("./static/imagenes/"+imagen.name)
    return "/imagenes/"+imagen.name
}