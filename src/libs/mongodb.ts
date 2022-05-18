import mongoose,{Mongoose} from "mongoose";
const URI_LOCAL = "mongodb://localhost:27017/red_social"
const URI_REMOTO ="mongodb+srv://mongoDB:admin123@cluster0.aexpf.mongodb.net/?retryWrites=true&w=majority/red_social"

async function connect() {
    return await mongoose.connect(URI_REMOTO)
}

export default connect