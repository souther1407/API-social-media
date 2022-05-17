import e, { Router,Request,Response } from "express";
import AuthServices from "../services/auth.services";
import {obtenerTextoError} from "../../utils/errors.utils"
import {CLIENT_ERROR,CREATED} from "../../libs/httpCodes"
const router:Router = Router()

interface ILogin{
    username:string,
    password:string
}

router.post("/login",async (req:Request,res:Response) => {
    try {
        const {username,password} = req.body as ILogin
        const token = await AuthServices.iniciarSesion(username,password)
        res.json({token})
    } catch (error) {
        res.status(CLIENT_ERROR).json({ error:obtenerTextoError(error) })
    }
})

router.post("/register", async (req:Request,res:Response) => {
    try {
        const {username,password,email} = req.body
        const respuesta= await AuthServices.registrarse(username,password,email)
        res.status(CREATED).json({respuesta})
    } catch (error) {
        res.status(CLIENT_ERROR).json({ error: obtenerTextoError(error)})
    }
})

export default router