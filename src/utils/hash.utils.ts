import {createHash} from "crypto"
import {config} from "dotenv"
config()
const {HASH_SECRET} = process.env

export function hashPassword(password:string){
    return createHash("sha256").update(password+HASH_SECRET).digest("hex")
}