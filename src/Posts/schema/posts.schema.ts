import mongoose,{Schema,SchemaTypes} from "mongoose";

const PostSchema = new Schema({
    contenido:{type:SchemaTypes.String,required:true},
    usuarioId:{type:SchemaTypes.ObjectId,required:true,ref:"usuarios"},
    fecha:{type:SchemaTypes.Date},
    imagen:{type:SchemaTypes.String,required:false}
})

export default PostSchema