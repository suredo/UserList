import { Router } from "express";
import { UserController } from "../../controllers/userController";

const userController = new UserController();

export class Api {
  private routes: Router;

  constructor() {
    this.routes = Router();
    this.endpoints();
  }

  private endpoints() {
    this.routes.post("/adduser", userController.addUser);
    this.routes.get("/getuser/:cpf", userController.getUser);
  }

  public getRoutes() {
    return this.routes;
  }
}
