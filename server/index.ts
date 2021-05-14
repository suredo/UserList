import { Server } from "./server";
(async () => {
  try {
    const server = new Server(3003);
    await server.init();
    server.listen();
  } catch (error) {
    console.log(error);
  }
})();
