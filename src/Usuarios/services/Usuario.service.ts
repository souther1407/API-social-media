import Usuario from "../model/usuario.model";
import {hashPassword} from "../../utils/hash.utils"
import { Query } from "mongoose";
interface IUsuario{
    nombre:string,
    email:string,
    salt:string,
    avatar?:string
}

class UsuarioService{
    
    public static async crear(user:IUsuario){
        user.salt=hashPassword(user.salt)
        const newUser = await Usuario.create(user)
        return {success:true,newUser}
    }

    public static async borrarTodos(){
        await Usuario.deleteMany()
        return {success:true}
    }

    public static async obtenerTodos(){
        return await Usuario.find({},)
    }

    public static async existeUsuarioId(usuarioId:string){
        const existe = await Usuario.findById(usuarioId)
        return existe
    }
    
    public static async existeUsuarioUserPass(usuario:string,password:string):Promise<null | Query<any,{}>>{
        const salt = hashPassword(password)
        const existe = await Usuario.findOne({nombre:usuario,salt})
        return existe
    }

    public static async editarUsuario(data:IUsuario,id:string){
        const editado = await Usuario.updateOne({_id:id},{...data})
        return editado
    }

    public static async obtenerUsuarioPorId(usuarioId:string){
        const usuario = await Usuario.findById(usuarioId);
        return usuario;
    }
    
}

export default UsuarioService