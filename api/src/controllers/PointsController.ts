import { Request, Response } from "express";
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

    res.json("ok");
  }
}

export default PointsController;
