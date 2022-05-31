import {Request} from "express"
import {JwtPayload} from "jsonwebtoken"


export interface RequestWithUserData extends Request{
    userData:JwtPayload
}