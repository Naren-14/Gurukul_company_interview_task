const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// const errorController = require("./controllers/error");
const mongoConnect = require("./utli/database").mongoConnect;

const app = express();

const authRoutes = require("./routes/auth.router");
const userRoutes = require("./routes/user.router");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use(authRoutes);
app.use(userRoutes);

// app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3002);
});
