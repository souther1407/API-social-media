import mongoose,{Schema,SchemaTypes} from "mongoose";

const LikesSchema = new Schema({
    usuarioId:{type:SchemaTypes.ObjectId,required:true,ref:"usuarios"},
    fecha:{type:SchemaTypes.Date},
    postId:{type:SchemaTypes.ObjectId,required:true,ref:"posts"}
})

export default LikesSchema