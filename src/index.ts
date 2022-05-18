import express from "express"
import connect from "./libs/mongodb"
import UsuarioService from "./Usuarios/services/Usuario.service"
import {resetDataBase} from "./utils/dev.utils"
import loadRoutes from "./routes"
import {config} from "dotenv"
config()
import cors from "cors"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const {PORT} = process.env

loadRoutes(app)


app.listen((PORT as string) || 8080, async () => {
    console.log("andando...")
    await connect()
    console.log(await resetDataBase())
    console.log("conectado a mongodb")
    const user = {
        nombre:"souther92",
        email:"south92@hotmail.com",
        salt:"123",
        avatar:"afaf",
    }
 
})
