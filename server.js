const express = require("express");
const app = express();

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const workingHoursMiddleware = (req, res, next) => {
  const today = new Date();
  const day = today.getDay();
  const hours = today.getHours();

  if (day >= 1 && day <= 5 && hours >= 9 && hours < 17) {
    next();
  } else {
    res.sendFile(__dirname + "/closed/index.html");
  }
};

app.use(express.static("public"));

app.get("/", workingHoursMiddleware, (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/services", workingHoursMiddleware, (req, res) => {
  res.sendFile(__dirname + "/public/services.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});
