import mongoose,{Schema,SchemaTypes} from "mongoose";

const PostSchema = new Schema({
    titulo:{type:SchemaTypes.String, required:true},
    contenido:{type:SchemaTypes.String,required:true},
    usuarioId:{type:SchemaTypes.ObjectId,required:true},
    fecha:{type:SchemaTypes.Date}
})

export default PostSchema