import axios from "axios";
import fetch from "node-fetch";
import {URL_IMGS} from "./globals"
import {UploadedFile} from "express-fileupload"
export async function getInit(){
    const r = await fetch(URL_IMGS)
    const response = await r.json()
    return  response
}

export async function guardarImagen(imagen:UploadedFile){
    return (await axios.post(URL_IMGS+"save",{imagen})).data
}