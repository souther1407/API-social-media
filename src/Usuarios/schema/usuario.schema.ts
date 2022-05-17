import mongoose,{Schema,SchemaTypes} from "mongoose";


const UsuarioSchema = new Schema({
    nombre: { type:SchemaTypes.String, unique:true},
    email: { type:SchemaTypes.String, unique:true},
    salt: SchemaTypes.String,
    avatar: SchemaTypes.String
})

export default UsuarioSchema