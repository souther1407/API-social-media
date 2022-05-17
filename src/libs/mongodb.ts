import mongoose,{Mongoose} from "mongoose";
const URI = "mongodb://localhost:27017/red_social"


async function connect() {
    return await mongoose.connect(URI)
}

export default connect