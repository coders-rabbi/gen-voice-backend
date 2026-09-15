import http from "http";
import { app } from "./app";
import config from "./app/config";
import { initSocket } from "./app/socket";

const server = http.createServer(app);

// socket.io ke http server-er sathe attach kora
initSocket(server);

if (process.env.NODE_ENV !== "production") {
  const PORT = config.port || 5000;
  server.listen(PORT, () => {
    console.log(`GenVoice app listening on port ${PORT}`);
  });
}

process.on("unhandledRejection", () => {
  console.log("Unhandled rejection detected, shutting down...");
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("Uncaught exception detected, shutting down...");
  process.exit(1);
});

export default app;
