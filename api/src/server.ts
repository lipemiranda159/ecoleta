import express, { Request, Response } from "express";

const app = express();

app.get("/users", (req, res) => {
  console.log("teste");
  res.send("ok");
});

//npm install express
//npm install @type/express -d
//npm install ts-node -d
//npm install typescript -d
//npx tsc --init
