import { Router,Request,Response } from "express";
import {CLIENT_ERROR} from "../../libs/httpCodes"
import { isLogged, isTokenValid } from "../../middlewares/auth.middlewares";
import { userData } from "../../utils/globals";
import LikesServices from "../services/likes.services";
import { responderError } from "../../utils/errors.utils";
const router = Router()

// obtiene todos los likes de todos los usuarios
router.get("/", async (request:Request, response:Response) => {
    try {
        const likes = await LikesServices.obtenerTodoLosLikes()
        response.json(likes)
    }catch (unknownError) {
        responderError(unknownError as Error,response);
    }
})

// agrega un like por parte de un usuario a un post
router.post("/",isLogged,isTokenValid,async (request:Request, response:Response) => {
    try {

        const {postId} = request.body

        const {sub} = userData.payload

        const newLike = await LikesServices.agregarLike(postId,sub)

        response.json({ success: true, newLike })
    } catch (unknownError) {
        responderError(unknownError as Error,response);
    }
})

// devuelve si un usuario ya dio like a un post
router.get("/liked/:postId",isLogged,isTokenValid,async (request:Request, response:Response) => {
    try {
        const {postId} = request.params;
        const {sub} = userData.payload
        const liked = await LikesServices.dioLike(postId,sub);
        response.json({liked})
    }catch (unknownError) {
        responderError(unknownError as Error,response);
    }
})


// obtiene la cantidad de likes de un post
router.get("/:postId", async (request:Request, response:Response) => {
    try {
        const {postId} = request.params;
        const cantidadLikes = await LikesServices.obtenerLaCantidadLikes(postId);
        response.json({cantidadLikes})
    }catch (unknownError) {
        responderError(unknownError as Error,response);
    }
})

// borra un like de un post
router.delete("/dislike/:postId",isLogged,isTokenValid,async (request:Request, response:Response) => {
    try {
        const {postId} = request.params;
        const {sub} = userData.payload;
        const disliked = await LikesServices.dislike(postId,sub);
        response.json({disliked})
    }catch (unknownError) {
        responderError(unknownError as Error,response);
    }
})

export default router;