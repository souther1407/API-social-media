import mongoose,{Schema,SchemaTypes} from "mongoose";

const PostSchema = new Schema({
    contenido:{type:SchemaTypes.String,required:true},
    usuarioId:{type:SchemaTypes.ObjectId,required:true},
    fecha:{type:SchemaTypes.Date}
})

export default PostSchema