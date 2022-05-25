import Post from "../model/post.model";
import Likes from "../../Likes/model/likes.model"
import LikesServices from "../../Likes/services/likes.services"

interface IPost{
    tweet:string,
    imagen?:string
}


class PostService{

    public static async crearPost(post:IPost,usuarioId:string){
        await Post.create({ contenido:post.tweet,usuarioId,imagen:post.imagen ,fecha:new Date().toISOString()})
        return {success:true}
    }

    public static async obtenerPorId(usuarioId:string){
        return  await Post.find({usuarioId})
    }
    public static async obtenerTodos(cant:string="50"){
        const posts = await Post.find().populate("usuarioId").limit(Number(cant)).sort({fecha:"desc"})
        const likes = await Promise.all(posts.map( p => LikesServices.obtenerLaCantidadLikes(p._id)));
        return posts.map((p,i) =>{return {post:p,cantidadLikes:likes[i]}})
    }
    

    public static async obtenerNuevosPost(fecha:string){
        const fechaComoDate = new Date(fecha);
        const newPosts = await Post.find().populate("usuarioId").where("fecha").gt(fechaComoDate.getTime()).sort({fecha:"desc"})
        const likes = await Promise.all(newPosts.map( p => LikesServices.obtenerLaCantidadLikes(p._id)));
        return newPosts.map((p,i) =>{return {post:p,cantidadLikes:likes[i]}})
        
    }

    public static async obtenerTodosFavoritos(usuarioId:string){
       
        return await Likes.find({usuarioId},"postId").populate(["postId","usuarioId"])

    }
}


export default PostService