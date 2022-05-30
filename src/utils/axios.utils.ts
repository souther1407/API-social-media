import axios from "axios";
import {URL_IMGS} from "./globals"
import {UploadedFile} from "express-fileupload"
export async function getInit(){
    return  (await axios.get(URL_IMGS)).data
}

export async function guardarImagen(imagen:UploadedFile){
    return (await axios.post(URL_IMGS+"save",{imagen})).data
}