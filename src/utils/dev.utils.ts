import mongoose from "mongoose"
import chalk from "chalk"

export async function resetDataBase(){
    await mongoose.connection.dropDatabase()
    return "database reset"
}

export class Logger{

    public static error(msg:string){
        console.log(chalk.red(msg))
    }
    
    public static success(msg:string){
        console.log(chalk.green(msg))
    }
    public static marked(msg:string){
        console.log(chalk.magenta("***",msg,"***"))
    }
}