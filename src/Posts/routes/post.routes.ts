import { Router,Request,Response } from "express";
import PostService from "../services/post.services";
const router:Router = Router()
import {CLIENT_ERROR} from "../../libs/httpCodes"

import {isLogged,isTokenValid} from "../../middlewares/auth.middlewares"
import {verifyUserId} from "../../middlewares/users.middlewares"

import {userData} from "../../utils/globals"

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
        console.log("archivo???",request.files)
        const incomingPost = request.body
        const newPost = await PostService.crearPost(incomingPost,userData.payload.sub)
        response.json(newPost)
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

export default router