import express from "express"
import connect from "./libs/mongodb"
import UsuarioService from "./Usuarios/services/Usuario.service"
import {resetDataBase,Logger} from "./utils/dev.utils"
import fileUpload from "express-fileupload"
import loadRoutes from "./routes"
import {config} from "dotenv"
config()
import cors from "cors"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(fileUpload({createParentPath:true}))

const {PORT} = process.env

loadRoutes(app)


app.listen((PORT as string) || 8080, async () => {
    Logger.success("andando en puerto "+(PORT || 8080))
    await connect()
    Logger.success("conectado a mongoDB")
 
})
