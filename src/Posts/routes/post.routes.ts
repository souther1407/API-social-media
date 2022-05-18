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


router.post("/",isLogged,isTokenValid,verifyUserId, async (request:Request,response:Response) => {
    try {
        console.log(userData.payload)
        /* const userId = userData.payload.sub */
        const incomingPost= request.body
        const newPost = await PostService.crearPost(incomingPost,"a342")
        response.json(newPost)
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

export default router