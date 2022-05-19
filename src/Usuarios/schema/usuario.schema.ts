import mongoose,{Schema,SchemaTypes} from "mongoose";


const UsuarioSchema = new Schema({
    nombre: { type:SchemaTypes.String, unique:true},
    email: { type:SchemaTypes.String, unique:true},
    salt: SchemaTypes.String,
    avatar: {
        type:SchemaTypes.String,
        default:"https://as01.epimg.net/meristation/imagenes/2022/04/27/noticias/1651090407_472545_1651090465_sumario_normal.jpg"}
})

export default UsuarioSchema