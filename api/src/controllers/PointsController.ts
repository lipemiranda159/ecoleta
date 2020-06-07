import { Request, Response, response } from "express";
import knex from "../database/connection";

class PointsController {
  async create(req: Request, res: Response) {
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

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const pointId = await trx("points").insert({ point });
    const point_items = items.map((item_id: number) => {
      return {
        item_id,
        point_id: pointId[0],
      };
    });
    await trx("point_items").insert(point_items);
    await trx.commit();
    return res.json({
      id: pointId[0],
      ...point,
    });
  }

  async index(req: Request, res: Response) {
    const { uf, city, items } = req.params;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points_id", "=", "point_items.point_id")
      .whereIn("point_items.items_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");
    return res.send(points);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();
    if (!point) {
      return response.status(404).json("Point not found!");
    }

    const items = await knex("items")
      .join("point_items", "items_id", "=", "point_items.item_id")
      .where("point_items.point_id", id);

    return res.json(point);
  }
}

export default PointsController;
