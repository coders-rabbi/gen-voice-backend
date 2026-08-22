import mongoose from "mongoose";
import { app } from "./app";
import config from "./app/config";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(config.database_url as string);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
}

// প্রতি request-এ DB connected আছে কিনা check করে
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Local development-এ শুধু listen করবে
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
