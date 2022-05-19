import { Router,Request,Response } from "express";
import { resetDataBase } from "../../utils/dev.utils";
const router:Router = Router()

router.get("/resetDb", async (request:Request,response:Response) => {
    await resetDataBase()
    response.send("<h1>Database reseted </h1>")
})

export default router;