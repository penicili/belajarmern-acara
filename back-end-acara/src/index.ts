import express from "express";
import router from "./routes/api";
import db from "./utils/database";
import bodyParser from "body-parser";

async function init() {
  try {
    // Connect ke db
    const result = await db();
    console.log("database status:", result);
    const app = express();
    // Body parser middleware to parse JSON request body
    app.use(bodyParser.json());
    // API prefix router middleware
    app.use("/api", router);
    const PORT = 3000;

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
