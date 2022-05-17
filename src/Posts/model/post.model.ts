import mongoose,{Model} from "mongoose";
import PostSchema from "../schema/posts.schema";

const Post = mongoose.model("posts",PostSchema)

export default Post