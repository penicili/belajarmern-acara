import express from "express";
import router from "./routes/api";
import db from "./utils/database";
import cors from "cors";
import bodyParser from "body-parser";
import docs from "./docs/route";


async function init() {
  try {
    // Connect ke db
    const result = await db();
    console.log("database status:", result);
    const app = express();
    // Enable CORS midleware
    app.use(cors());
    // Body parser middleware to parse JSON request body
    app.use(bodyParser.json());
    // API prefix router middleware
    app.use("/api", router);
    docs(app);
    const PORT = 3000;

    app.get("/", (req, res)=>{
      res.status(200).json({
        message: "Server is running",
        data: null
      })
    })

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
