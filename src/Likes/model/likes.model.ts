import moogose from "mongoose"
import LikesSchema from "../schema/likes.schema"

const LikesModel = moogose.model("likes",LikesSchema);

export default LikesModel;