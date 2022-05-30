import { Router,Request,Response } from "express";
import { CLIENT_ERROR } from "../../libs/httpCodes";
import {getInit} from "../../utils/axios.utils"
const router:Router = Router()
import path from "path"

router.get("/prueba",async (request:Request,response:Response) => {
    response.json(await getInit())
})


// /imagenes/imagen5389252895.png
router.get("/:nombre",async (request:Request,response:Response) => {
    try {
        const {nombre} = request.params;
        
        response.sendFile(path.join(__dirname,"../../../static/imagenes/",nombre));
    } catch (unknownError) {
        const error = unknownError as Error
        response.status(CLIENT_ERROR).json({error: error.message})
    }
})



export default router