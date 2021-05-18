import { Schema, Document, model } from "mongoose";

interface IUser extends Document {
  name: string;
  surname: string;
  telephone: string;
  cpf: string;
}

const User = new Schema({
  name: String,
  surname: String,
  telephone: String,
  cpf: String,
});

export default model<IUser>("User", User);
