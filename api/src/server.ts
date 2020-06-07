import express, { Request, Response } from "express";

const app = express();

app.get("/users", (req, res) => {
  console.log("teste");
  res.json(["Felipe", "Felipe"]);
});

app.listen(3000);

//npm install express
//npm install @type/express -d
//npm install ts-node -d
//npm install typescript -d
//npx tsc --init
//npm install ts-node-dev -D
//npx ts-node-dev ./src/server.ts
//add script dev in package.json
