import express from "express";

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
  }

  /**Middlewares setup*/
  private setupExpress() {
    this.app.use(express.json());
  }

  /**Initilizes server at given port*/
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}
