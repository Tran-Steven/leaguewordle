require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

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

  app.use(
    "/",
    express.static(
      "/Users/steventran/leaguewordle/leaguewordle/leaguewordle-frontend/public"
    )
  );

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: "visualsteven2@gmail.com",
    subject: "LeagueWordle Bug/Issue",
    html: `<div className="email>
<p>${text}</p>
    </div>
    `,
  });
});

app.listen(
  (process.env.PORT || port,
  () => {
    console.log(`Server is listening on port Log ${process.env.PORT}`);
  })
);

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
