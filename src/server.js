import app from "./app.js";
import { connectDb } from "./config/db.js";
import { ENV } from "./config/env.js";

connectDb();

app.listen(ENV.port, () => {
  console.log(`server is running ${ENV.port}`);
});
