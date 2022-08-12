require("dotenv").config();
const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 2525;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Sets the static page to frontend  html
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

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

  //sends mail with the user submitted text
  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: "LeagueWordle Bug/Issue",
    html: `
<b>${text}</b>

    `,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
