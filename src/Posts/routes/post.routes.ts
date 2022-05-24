import { Router,Request,Response } from "express";
import PostService from "../services/post.services";
const router:Router = Router()
import {CLIENT_ERROR} from "../../libs/httpCodes"

import {isLogged,isTokenValid} from "../../middlewares/auth.middlewares"

import {userData} from "../../utils/globals"
import {guardarImagen} from "../../utils/files.utiles"
import {UploadedFile} from "express-fileupload"





router.get("/favourites",isLogged,isTokenValid,async (request:Request,response:Response) => {
    try {
        //const usuarioId = (request as any).userData.sub
        const usuarioId = userData.payload.sub
        console.log("adasda",usuarioId)
        const postsFavoritos = await PostService.obtenerTodosFavoritos(usuarioId)
        response.json(postsFavoritos);
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

router.get("/:userId",async (request:Request,response:Response) => {

    //TODO: obtener todos los post hechos por un usuario
    try {
        const {userId} = request.params

        const posts = await PostService.obtenerPorId(userId)

        response.json(posts)
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

router.get("/", async (request:Request,response:Response) => {
    const {cant} = request.query
    try {
        const posts = await PostService.obtenerTodos(cant as string)
        response.json(posts)
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})



router.post("/hay-nuevos-posts",async (request:Request,response:Response) => {
    try {
        const {fecha} = request.body;
        const newPosts = await PostService.obtenerNuevosPost(fecha);
        response.json(newPosts);
    }catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

router.post("/",isLogged,isTokenValid, async (request:Request,response:Response) => {
    try {
        const incomingPost = request.body

        if(request.files) incomingPost.imagen=await guardarImagen(request.files.image as UploadedFile)

        const newPost = await PostService.crearPost(incomingPost,(request as any).userData)
        
        response.json(newPost)
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

export default router