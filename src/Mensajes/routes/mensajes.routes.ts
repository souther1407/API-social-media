import { Router,Request,Response } from "express";
import { CLIENT_ERROR } from "../../libs/httpCodes";
import MensajesServices from "../services/mensajes.services";
import { responderError } from "../../utils/errors.utils";
const router:Router = Router()

router.post("/send", async (request:Request,response:Response) => {
    try {
        const body = request.body;
        const newMsg = await MensajesServices.enviarMensaje(body)
        response.json({success:true, newMsg})
    } catch (error) {
        responderError(error as Error,response)
    }
})

router.post("/recieve",async (request:Request,response:Response) => {
    try {
        const {usuario_origen, usuario_destino} = request.body
        const msgs = await MensajesServices.getConversacion(usuario_origen,usuario_destino)
        response.json(msgs)
    } catch (error) {
        responderError(error as Error,response)
    }
})

export default router;