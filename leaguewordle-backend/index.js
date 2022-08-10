require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 2525;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./leaguewordle/leaguewordle-frontend/public"));
  app.get("*", (req, res) => {
    req.sendFile(
      path.resolve(
        __dirname,
        "./leaguewordle/leaguewordle-frontend/public",
        "index.html"
      )
    );
  });
}

//when user submits an email, it takes the text and sends it to backend
app.post("/send_mail", cors(), async (req, res) => {
  let { text } = req.body;

  //auth for nodemailer
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  //loads the front end
  app.get(
    "/Users/steventran/leaguewordle/leaguewordle/leaguewordle-frontend/public",
    function (req, res) {
      res.render("index", {});
    }
  );

  //sends mail with the user submitted text
  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: "visualsteven@gmail.com",
    subject: "LeagueWordle Bug/Issue",
    html: `
<b>${text}</b>

    `,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
