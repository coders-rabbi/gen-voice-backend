import mongoose from "mongoose";
import { app, port } from "./app";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`GenVoice app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
