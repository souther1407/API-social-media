import {Express} from "express"
import usuariosRouter from "./Usuarios/routes/Usuarios.routes"
import authRouter from "./Auth/routes/auth.routes"
import postsRouter from "./Posts/routes/post.routes"
import mensajesRouter from "./Mensajes/routes/mensajes.routes"
import testRouter from "./Test/routes/test.routes"

export default (app:Express) => {
    
app.use("/users",usuariosRouter)

app.use("/auth",authRouter)

app.use("/posts",postsRouter)

app.use("/msg",mensajesRouter)

app.use("/test",testRouter)
}