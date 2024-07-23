import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  _id: Types.ObjectId; // Ajouter cette ligne pour spécifier que _id est de type ObjectId
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<IUser>("User", UserSchema);

export default User;
