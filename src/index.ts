import express from "express"
import connect from "./libs/mongodb"
import UsuarioService from "./Usuarios/services/Usuario.service"
import {resetDataBase} from "./utils/dev.utils"

const app = express()
app.use(express.json())
app.use(express.urlencoded())

import usuariosRouter from "./Usuarios/routes/Usuarios.routes"
app.use("/users",usuariosRouter)

import authRouter from "./Auth/routes/auth.routes"
app.use("/auth",authRouter)

import postsRouter from "./Posts/routes/post.routes"
app.use("/posts",postsRouter)

import mensajesRouter from "./Mensajes/routes/mensajes.routes"
app.use("/msg",mensajesRouter)

app.listen(8080, async () => {
    console.log("andando...")
    await connect()
    //console.log(await resetDataBase())
    console.log("conectado a mongodb")
    const user = {
        nombre:"souther92",
        email:"south92@hotmail.com",
        salt:"123",
        avatar:"afaf",
    }
 
})
