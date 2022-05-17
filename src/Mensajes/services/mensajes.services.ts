import Mensajes from "../model/mensajes.model"

interface MensajeEstructura{
    usuarioEmisor:string,
    usuarioReceptor:string,
    contenido:string,
}

class MensajesServices{

    public static async enviarMensaje(msj:MensajeEstructura){
        return await Mensajes.create({...msj,fecha:new Date().toISOString()})
    }

    public static async getMensajes(usuario_origen:string,usuario_destino:string){
        return await Mensajes.find({usuario_origen,usuario_destino})
    }
    //TODO:agregar posibilidad de obtener n cantidad de mensajes
    public static async getConversacion(usuario_origen:string,usuario_destino:string){

        const mensajesOrigenADestino = { usuario_origen, usuario_destino }

        const mensajesDestinoAOrigen = { 
            usuario_origen: usuario_destino,
            suario_destino: usuario_origen 
        }
        
        return await Mensajes.find().or([mensajesDestinoAOrigen,mensajesOrigenADestino]).sort({fecha:"desc"})
        
    }
}

export default MensajesServices