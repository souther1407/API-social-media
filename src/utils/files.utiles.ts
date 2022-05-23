import {UploadedFile} from "express-fileupload"
import x from "../static/imagenes"
function generarNumeroAleatorio(){
    return Math.floor(Math.random()*2342398923589)
}

export async function guardarImagen(imagen:UploadedFile){
    imagen.name="imagen"+generarNumeroAleatorio()+".png"
    console.log(__dirname)
    await imagen.mv("../static/imagenes/"+imagen.name)
}