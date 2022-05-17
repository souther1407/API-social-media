import mongoose,{Schema,SchemaTypes} from "mongoose";

const PostSchema = new Schema({
    titulo:{type:SchemaTypes.String},
    contenido:{type:SchemaTypes.String},
    usuarioId:{type:SchemaTypes.ObjectId}
})

export default PostSchema