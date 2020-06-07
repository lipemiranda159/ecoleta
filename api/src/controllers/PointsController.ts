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

    return res.json("ok");
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
