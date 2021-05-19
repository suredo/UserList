import { Request, Response } from "express";
import { validate } from "gerador-validador-cpf";
import { CallbackError } from "mongoose";
import user, { IUser } from "../models/userModel";

export class UserController {
  /**Adds user data to mongoDb */
  public addUser(req: Request, res: Response) {
    //Validates cpf field
    if (validate(req.body.cpf)) {
      //Checks if cpf is already registered
      user.findOne({ cpf: req.body.cpf }, (err: CallbackError, data: IUser) => {
        if (data) {
          res
            .status(400)
            .send({ success: false, err, msg: "CPF já cadastrado" });
        } else {
          //If cpf is note registered then register the user
          user
            .create(req.body)
            .then(() => res.status(200).send({ success: true }))
            .catch((err) => res.status(400).send({ success: false, err }));
        }
      });
    } else {
      res.status(400).send({ success: false, msg: "CPF inválido" });
    }
  }

  /**Get user data by cpf field */
  public getUser(req: Request, res: Response) {
    console.log(req.params);
    user
      .findOne({ cpf: req.params.cpf })
      .then((data) => {
        if (data) {
          return res.status(200).send({ success: true, userData: data });
        } else {
          res.status(404).send({
            success: false,
            msg: "Informações de CPF não armazenadas.",
          });
        }
      })
      .catch((err) =>
        res.status(500).send({
          success: false,
          err,
        })
      );
  }
}
