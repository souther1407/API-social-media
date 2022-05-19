import Post from "../model/post.model";

interface IPost{
    tweet:string,
}

class PostService{

    public static async crearPost(post:IPost,usuarioId:string){
        await Post.create({ contenido:post.tweet,usuarioId, fecha:new Date().toISOString()})
        return {success:true}
    }

    public static async obtenerPorId(usuarioId:string){
        return await Post.find({usuarioId})
    }
    public static async obtenerTodos(cant:number=50){
        return await Post.find().limit(cant).sort({fecha:"desc"})
    }
}


export default PostService