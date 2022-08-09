require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const port = 2525;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/send_mail", cors(), async (req, res) => {
  let { text } = req.body;
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // app.get(
  //   "/",
  //   express.static(
  //     "/Users/steventran/leaguewordle/leaguewordle/leaguewordle-frontend/public"
  //   )
  // );

  app.get(
    "/Users/steventran/leaguewordle/leaguewordle/leaguewordle-frontend/public",
    function (req, res) {
      res.render("index", {});
    }
  );

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: "visualsteven@gmail.com",
    subject: "LeagueWordle Bug/Issue",
    html: `
<b>${text}</b>

    `,
  });
});

// app.listen(
//   (process.env.PORT,
//   () => {
//     console.log(`Server is listening on port Log ${process.env.PORT}`);
//   })
// );

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
