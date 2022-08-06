const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// middlewear
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.end("hello");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
