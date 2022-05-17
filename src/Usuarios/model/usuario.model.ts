import mongoose,{Model} from "mongoose";
import UsuarioSchema from "../schema/usuario.schema";

const Usuario = mongoose.model("usuarios",UsuarioSchema)

export default Usuario