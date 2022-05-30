import mongoose,{Schema,SchemaTypes} from "mongoose";


const UsuarioSchema = new Schema({
    nombre: { type:SchemaTypes.String, unique:true},
    descripcion:{type:SchemaTypes.String},
    fecha:{type:SchemaTypes.Date},
    email: { type:SchemaTypes.String, unique:true},
    salt: SchemaTypes.String,
    ubicacion:{type:SchemaTypes.String},
    avatar: {
        type:SchemaTypes.String,
        default:"https://as01.epimg.net/meristation/imagenes/2022/04/27/noticias/1651090407_472545_1651090465_sumario_normal.jpg"},
    portada:{type:SchemaTypes.String,default:"https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
})

export default UsuarioSchema