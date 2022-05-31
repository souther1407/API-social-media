export function obtenerTextoError(error:unknown){
    return (error as Error).message
}

import { Response } from "express"
import { CLIENT_ERROR } from "../libs/httpCodes"
export function responderError(error:Error,response:Response){
    return response.status(CLIENT_ERROR).json({error:error.message})
}