import Post from "../model/post.model";

interface IPost{
    titulo:string,
    contenido:string,
    usuarioId:string,
}

class PostService{

    public static async crearPost(post:IPost){
        await Post.create(post)
        return {success:true}
    }

    public static async obtenerPorId(usuarioId:string){
        return await Post.find({usuarioId})
    }
}


export default PostService