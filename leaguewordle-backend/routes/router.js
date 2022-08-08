import * as dotenv from "dotenv";
dotenv.config();
import aws from "aws-sdk";
import express from "express";

//Initializing Variables
const router = express.Router();
const ses = new aws.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

  region: "us-east-2",
});

router.post("/email", (req, res) => {
  const { email, message } = req.body;
  sesSend("visualsteven@gmail.com", email, message)
    .then((val) => {
      console.log("got this back", val);
      res.send("successful");
    })
    .catch((err) => {
      res.send("/error" + err);
    });
});

function sesSend(emailTo, emailFrom, message) {
  const params = {
    Destination: {
      ToAddresses: [emailTo],
    },
    Message: {
      Body: {
        Text: {
          Data: "BugReport/Issue: " + "\n" + message,
        },
      },
      Subject: {
        Data: "LeagueWordle BugReport/Issue from: " + emailFrom,
      },
    },
    Source: "visualsteven1@gmail.com",
  };
  return ses.sendEmail(params).promise();
}

export default router;
