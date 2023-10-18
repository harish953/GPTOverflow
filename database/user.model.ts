import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  Username: string;
  email?: string;
  password?: string;
  picture?: string;
  bio?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved?: Schema.Types.ObjectId[];
  joinedDate: Date;
}
const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  picture: { type: String },
  location: { type: String },
  portfolioWebsite: { type: String, default: "" },
  reputation: { type: Number },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedDate: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;
