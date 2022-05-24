import {UploadedFile} from "express-fileupload"

function generarNumeroAleatorio(){
    return Math.floor(Math.random()*Number.MAX_SAFE_INTEGER)
}

export async function guardarImagen(imagen:UploadedFile){
    imagen.name="imagen"+generarNumeroAleatorio()+".png"

    await imagen.mv("./static/imagenes/"+imagen.name)
    return "/imagenes/"+imagen.name
}