import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  surname: string;
  telephone: string;
  cpf: string;
}

const User = new Schema({
  name: String,
  surname: String,
  telephone: String,
  cpf: { type: String, required: true, unique: true },
});

export default model<IUser>("User", User);
