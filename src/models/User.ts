import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt"


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
    select: false, //plockar aldrig ut lösenordet 
    required: true
  }
}, {
  timestamps: true //Extra option, now to add a time stamp when a user is made or changed
});
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) next(); 

  const passwordHash = await bcrypt.hash(this.password, 10)
  this.password = passwordHash
})

const User = model<IUser>("User", UserSchema); //User is the name of the value from the database

export default User