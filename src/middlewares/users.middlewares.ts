import { Request,Response,NextFunction } from "express";
import UsuarioService from "../Usuarios/services/Usuario.service";
import { CLIENT_ERROR } from "../libs/httpCodes";


export async function verifyUserId(request:Request,response:Response,next:NextFunction){
    const {usuarioId} = request.body
    try {
        const existeUsuario = await UsuarioService.existeUsuarioId(usuarioId)
        if(existeUsuario !== null) next()
        else response.json({error:"el usuario no existe"})
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error:error.message})
    }
}