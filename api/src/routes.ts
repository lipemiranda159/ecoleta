import express from "express";
import knex from "./database/connection";
const routes = express.Router();

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

routes.post("point", async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = req.body;
  const trx = await knex.transaction();

  const pointId = await trx("points").insert({
    image: "image-fake",
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });
  const point_items = items.map((item_id: number) => {
    return {
      item_id,
      point_id: pointId[0],
    };
  });
  await trx("point_items").insert(point_items);

  res.json("ok");
});

export default routes;
