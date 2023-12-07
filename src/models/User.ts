import { Document, Schema, model } from "mongoose";


interface IUser extends Document {
  userName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true //Extra option, now to add a time stamp when a user is made or changed
})

const User = model<IUser>("User", UserSchema); //User is the name of the value from the database

export default User