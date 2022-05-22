import { Router,Request,Response } from "express";
import UsuarioService from "../services/Usuario.service";
const router:Router = Router()

router.get("/",async (req:Request,res:Response) => {
    res.json(await UsuarioService.obtenerTodos())
})

router.get("/exist/:id",async (req:Request,res:Response) => {
    const {id} = req.params
    try {
        
        res.json({existe:await UsuarioService.existeUsuarioId(id)})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})

router.put("/:id",async (req:Request,res:Response) => {
    const {id} = req.params
    try {
        const usuarioEditado = await UsuarioService.editarUsuario(req.body,id);
        res.json({success:true})
    } catch (error) {
        const err = error as Error
        res.status(400).json({error:err.message})
    }
})

export default router