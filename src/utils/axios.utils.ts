import axios from "axios";
import fetch from 'node-fetch';
import {URL_IMGS} from "./globals"
import {UploadedFile} from "express-fileupload"

export async function getInit(){
    const rawResponse = await fetch(URL_IMGS)
    const response = await rawResponse.json()
    return response
    /* return  (await axios.get(URL_IMGS)).data */
}

export async function guardarImagen(imagen:UploadedFile){
    const rawResponse = await fetch(URL_IMGS+"save",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(imagen)
    })
    const response = await rawResponse.json()
    return response
}