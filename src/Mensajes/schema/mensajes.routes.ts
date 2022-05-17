import mongoose,{Schema,SchemaTypes} from "mongoose";


const MensajesSchema = new Schema({
    usuario_origen:{type:SchemaTypes.ObjectId,required:true},
    usuario_destino:{type:SchemaTypes.ObjectId,required:true},
    fecha:{type:SchemaTypes.Date,required:true},
    contenido:{type:SchemaTypes.String,required:true}
});

export default MensajesSchema;