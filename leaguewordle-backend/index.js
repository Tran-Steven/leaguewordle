import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes/router.js";
import cors from "cors";

const app = express();
const port = 2525;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(
  "/",
  express.static(
    "/Users/steventran/leaguewordle/leaguewordle/leaguewordle-frontend/public"
  )
);

app.post("/email", (request, response) => {
  console.log(request.body);
  const { email } = request.body;
  response.status(200).json({ email });
});

app.listen(port, () => {
  console.log(process.env.AWS_ACCESS_KEY_ID);
  console.log(`Port running on ${port}`);
});
