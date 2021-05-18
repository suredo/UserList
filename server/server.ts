import express from "express";
import cors from "cors";
import * as db from "./db";
import { Routes } from "./routes";

export class Server {
  private app: express.Application;

  /**Server configuration
   * @param port - Port number on which the server will listen on
   */
  constructor(private port: number) {
    this.app = express();
  }

  /**Initializes express*/
  public async init() {
    this.setupExpress();
    await this.databaseSetup();
  }

  /**Middlewares setup*/
  private setupExpress() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(new Routes().getEndpoins());
  }

  /**Database setup
   * Initializes connection with database
   */
  private async databaseSetup() {
    await db.connect();
  }

  /**Initilizes server at given port*/
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}
