import { app } from "./app";
import config from "./app/config";

if (process.env.NODE_ENV !== "production") {
  const PORT = config.port || 5000;
  app.listen(PORT, () => {
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
