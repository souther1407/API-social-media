import { Router,Request,Response } from "express";
import {CLIENT_ERROR} from "../../libs/httpCodes"
import { isLogged, isTokenValid } from "../../middlewares/auth.middlewares";
import { userData } from "../../utils/globals";
import LikesServices from "../services/likes.services";

const router = Router()

router.get("/", async (request:Request, response:Response) => {
    try {
        const likes = await LikesServices.obtenerTodoLosLikes()
        response.json(likes)
    }catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

router.post("/",isLogged,isTokenValid,async (request:Request, response:Response) => {
    try {

        const {postId} = request.body

        const {sub} = userData.payload

        const newLike = await LikesServices.agregarLike(postId,sub)

        response.json({ success: true, newLike })
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

router.get("/liked/:postId",isLogged,isTokenValid,async (request:Request, response:Response) => {
    try {
        const {postId} = request.params;
        const {sub} = userData.payload
        const liked = await LikesServices.dioLike(postId,sub);
        response.json({liked})
    }catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})



router.get("/:postId", async (request:Request, response:Response) => {
    try {
        const {postId} = request.params;
        const cantidadLikes = await LikesServices.obtenerLaCantidadLikes(postId);
        response.json({cantidadLikes})
    }catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

router.delete("/dislike/:postId",isLogged,isTokenValid,async (request:Request, response:Response) => {
    try {
        const {postId} = request.params;
        const {sub} = userData.payload
        const disliked = await LikesServices.dislike(postId,sub);
        response.json({disliked})
    }catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})

export default router;