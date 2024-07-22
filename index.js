const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World..!");
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "vishal",
    email: "vishal@gmail.com",
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
  
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.send({ result: "Invalide Token..!" });
    } else {
      res.json({
        message: "Profile Accessed..!",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader.length)
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({ result: "Token is Invalide" });
  }
}

app.listen(3000, () => {
  console.log("Server is Running on Port : localhost:3000");
});
