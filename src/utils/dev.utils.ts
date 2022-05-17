import mongoose from "mongoose"

export async function resetDataBase(){
    await mongoose.connection.dropDatabase()
    return "database reset"
}