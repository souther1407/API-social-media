import { Router,Request,Response } from "express";
import UsuarioService from "../services/Usuario.service";
import {CLIENT_ERROR} from "../../libs/httpCodes"
import {isLogged,isTokenValid} from "../../middlewares/auth.middlewares"
const router:Router = Router()


// obtiene todos los usuarios
router.get("/",async (req:Request,res:Response) => {
    res.json(await UsuarioService.obtenerTodos())
})

// devuelve si un usuario existe 
router.get("/exist/:id",async (req:Request,res:Response) => {
    const {id} = req.params
    try {
        
        res.json({existe:await UsuarioService.existeUsuarioId(id)})
    } catch (error) {
        const err = error as Error
        res.status(CLIENT_ERROR).json({error:err.message})
    }
})

// edita la informacion de un usuario
router.put("/",isLogged,isTokenValid,async (req:Request,res:Response) => {
    try {
        const id= (req as any).userData.sub
        console.log("id en put user",id)
        console.log("archivos en el put de usuarios",req.files)
        const usuarioEditado = await UsuarioService.editarUsuario(req.body,id);
        res.json({success:true})
    } catch (error) {
        const err = error as Error
        res.status(CLIENT_ERROR).json({error:err.message})
    }
})

router.get("/:usuarioId",async (req:Request,res:Response) =>{
    const {usuarioId} = req.params
    try {
        const detalleUsuario = await UsuarioService.obtenerUsuarioPorId(usuarioId);
        res.json(detalleUsuario)
    } catch (error) {
        const err = error as Error
        res.status(CLIENT_ERROR).json({error:err.message})
    }
})

export default router