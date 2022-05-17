import mongoose,{Model} from "mongoose";
import MensajesSchema from "../schema/mensajes.routes";

const MensajeModel = mongoose.model("mensajes",MensajesSchema);

export default MensajeModel;