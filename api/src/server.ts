import express, { Request, Response } from "express";
import routes from "./routes";
const app = express();
app.use(express.json());
app.use(routes);

app.listen(3000);

//npm install express
//npm install @type/express -d
//npm install ts-node -d
//npm install typescript -d
//npx tsc --init
//npm install ts-node-dev -D
//npx ts-node-dev ./src/server.ts
//add script dev in package.json
//npx create-react-app web --template=typescript
