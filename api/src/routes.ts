import express from "express";

const routes = express.Router();

routes.get("/users", (req, res) => {
  console.log("teste");
  res.json(["Felipe", "Felipe"]);
});

export default routes;
