import { Router,Request,Response } from "express";
import PostService from "../services/post.services";
const router:Router = Router()
import {CLIENT_ERROR} from "../../libs/httpCodes"

import {isLogged,isTokenValid} from "../../middlewares/auth.middlewares"

import {userData} from "../../utils/globals"
import {guardarImagen} from "../../utils/files.utiles"
import {UploadedFile} from "express-fileupload"

/* import {guardarImagen} from "../../utils/axios.utils"
 */

// Obtiene la lista de posts favoritos de un usuario
router.get("/favourites",isLogged,isTokenValid,async (request:Request,response:Response) => {
    try {
        //TODO: migrar a userData del objeto request
        const usuarioId2 = (request as any).userData.sub
        const usuarioId = userData.payload.sub
        console.log("usuarioId2",usuarioId2)
        const postsFavoritos = await PostService.obtenerTodosFavoritos(usuarioId)
        response.json(postsFavoritos);
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

// Obtiene los posts hechos por un usuario
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

// devuelve un array con nuevos posts que el usuario este viendo en el home
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


// obtiene todos los posts de todos los usuarios
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

// agrega un nuevo post hecho por un usuario
router.post("/",isLogged,isTokenValid, async (request:Request,response:Response) => {
    try {
        const incomingPost = request.body
       
        if(request.files) incomingPost.imagen=await guardarImagen(request.files.image as UploadedFile)
        console.log("ruta imagen",incomingPost.imagen)
        /* if(request.files) console.log("img traida del otro server",await guardarImagen(request.files.image as UploadedFile)) */

        const newPost = await PostService.crearPost(incomingPost,(request as any).userData.sub)
        
        response.json(newPost)
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

export default router