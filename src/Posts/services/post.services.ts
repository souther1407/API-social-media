import Post from "../model/post.model";
import Usuario from "../../Usuarios/model/usuario.model"
interface IPost{
    tweet:string,
}



class PostService{

    public static async crearPost(post:IPost,usuarioId:string){
        await Post.create({ contenido:post.tweet,usuarioId, fecha:new Date().toISOString()})
        return {success:true}
    }

    public static async obtenerPorId(usuarioId:string){
        return  await Post.find({usuarioId})
    }
    public static async obtenerTodos(cant:string="50"){
        const posts = await Post.find().populate("usuarioId").limit(Number(cant)).sort({fecha:"desc"})
        return posts
    }

    public static async obtenerNuevosPost(fecha:string){
        const fechaComoDate = new Date(fecha);
        const newPosts = await Post.find().populate("usuarioId").where("fecha").gt(fechaComoDate.getTime()).sort({fecha:"desc"})
        return newPosts
    }
}


export default PostService