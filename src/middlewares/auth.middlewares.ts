import { Request,Response,NextFunction } from "express";
import {FORBIDDEN} from "../libs/httpCodes"
import jwt from "jsonwebtoken"
import {config} from "dotenv"
import {userData} from  "../utils/globals"
config()

const {TOKEN_SECRET} = process.env

export function isLogged(request:Request,response:Response,next:NextFunction){
    const authorizationHeader = request.headers.authorization
    if(!authorizationHeader){
        response.sendStatus(FORBIDDEN)
    }else{
        const token = authorizationHeader.split(" ")[1]
        request.headers.authorization = token
        next()
    }
}

export function isTokenValid(request:Request,response:Response,next:NextFunction){
    try {
        const token = request.headers.authorization as string
        
        const payload = jwt.verify(token,TOKEN_SECRET as string)
        console.log("en middleware isTokenValid",payload)
        userData.payload = payload
        next()
    } catch (error) {
        response.status(FORBIDDEN).json({error:"invalid token"})
    }
}