import express from "express";
import knex from "./database/connection";
const routes = express.Router();

routes.get("/users", (req, res) => {
  console.log("teste");
  res.json(["Felipe", "Felipe"]);
});

routes.get("/items", async (req, res) => {
  const items = await knex("items").select("*");
  const serializedItems = items.map((item) => {
    return {
      title: item.title,
      image_url: `http://localhost:3000/uploads/${item.image}`,
    };
  });
  return res.json(serializedItems);
});

export default routes;
