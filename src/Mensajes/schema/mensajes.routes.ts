import mongoose,{Schema,SchemaTypes} from "mongoose";


const MensajesSchema = new Schema({
    usuario_origen:{type:SchemaTypes.ObjectId,required:true,ref:"usuarios"},
    usuario_destino:{type:SchemaTypes.ObjectId,required:true,ref:"usuarios"},
    fecha:{type:SchemaTypes.Date,required:true},
    contenido:{type:SchemaTypes.String,required:true}
});

export default MensajesSchema;