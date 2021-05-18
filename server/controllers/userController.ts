import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import user, { IUser } from "../models/userModel";

export class UserController {
  /**Adds user data to mongoDb */
  public addUser(req: Request, res: Response) {
    user.findOne({ cpf: req.body.cpf }, (err: CallbackError, data: IUser) => {
      if (data) {
        res.status(400).send({ success: false, err, msg: "CPF já cadastrado" });
      } else {
        user
          .create(req.body)
          .then(() => res.status(200).send({ success: true }))
          .catch((err) => res.status(400).send({ success: false, err }));
      }
    });
  }
}
