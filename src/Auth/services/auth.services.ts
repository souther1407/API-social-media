import UsuarioService from "../../Usuarios/services/Usuario.service";
import jwt from "jsonwebtoken"
import {config} from "dotenv"
config()

const {TOKEN_SECRET} = process.env

class AuthServices{

    public static async iniciarSesion(usuario:string, password:string){

        const existe = await UsuarioService.existeUsuarioUserPass(usuario,password)

        if(!existe) throw new Error("El usuario no existe o credencianles incorrectas")

        const payload = {
            sub: existe._id
        }
        console.log("en iniciar sesion, services",payload.sub)
        const token = jwt.sign(payload,TOKEN_SECRET as string)

        return token
    }

    public static async registrarse(nombre:string, password:string, email:string){

        const existe = await UsuarioService.existeUsuarioUserPass(nombre,password)

        if(existe) throw new Error("el usuario ya esa registrado")
        
        return await UsuarioService.crear({nombre,salt:password,email})

    }
}


export default AuthServices