
import LikesModel from "../model/likes.model";


class LikesServices{
    public static async agregarLike(postId:string,usuarioId:string){
        return await LikesModel.create({ 
            fecha: new Date().toISOString(),
            usuarioId,
            postId
        })
    }
    public static async obtenerTodoLosLikes(){
        return await LikesModel.find();
    }

    public static async obtenerLaCantidadLikes(postId:string){
        return await LikesModel.count({postId})
    }
}


export default LikesServices;

