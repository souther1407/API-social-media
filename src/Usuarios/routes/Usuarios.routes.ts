import { Router,Request,Response } from "express";
import UsuarioService from "../services/Usuario.service";
import {CLIENT_ERROR} from "../../libs/httpCodes"
import {isLogged,isTokenValid} from "../../middlewares/auth.middlewares"
import {guardarImagen} from "../../utils/files.utiles"
import { responderError } from "../../utils/errors.utils";
const router:Router = Router()


// obtiene todos los usuarios
router.get("/",async (req:Request,res:Response) => {
    try {
        res.json(await UsuarioService.obtenerTodos())
    } catch (error) {
        responderError(error as Error,res)
    }
})

// devuelve si un usuario existe 
router.get("/exist/:id",async (req:Request,res:Response) => {
    const {id} = req.params
    try {
        
        res.json({existe:await UsuarioService.existeUsuarioId(id)})
    } catch (error) {
        responderError(error as Error,res)
    }
})

// edita la informacion de un usuario
router.put("/",isLogged,isTokenValid,async (req:Request,res:Response) => {
    const {avatar,portada} = req.files as any;
    const user= req.body
    try {
        //REFACTORIZAR
        const id= (req as any).userData.sub
        if(avatar)user.avatar = await guardarImagen(avatar);
        if(portada)user.portada = await guardarImagen(portada);
        const usuarioEditado = await UsuarioService.editarUsuario(user,id);
        res.json({success:true})
    } catch (error) {
        responderError(error as Error,res)
    }
})

router.get("/:usuarioId",async (req:Request,res:Response) =>{
    const {usuarioId} = req.params
    try {
        const detalleUsuario = await UsuarioService.obtenerUsuarioPorId(usuarioId);
        res.json(detalleUsuario)
    } catch (error) {
        responderError(error as Error,res)
    }
})

export default router