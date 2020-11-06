import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    var points: any = knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .distinct()
      .select("points.*");

    if (items?.length) points.whereIn("point_items.item_id", parsedItems);
    if (city != "" && city != undefined) points.where("city", String(city));
    if (uf != "" && uf != undefined) points.where("uf", String(uf));

    points.then((points: any) => {
      const serializedPoints = points.map((point: any) => {
        return {
          ...point,
          image_url: `http://192.168.0.244:3333/uploads/${point.image}`,
        };
      });
      return response.json(serializedPoints);
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("points").where("id", id).first();

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.244:3333/uploads/${point.image}`,
    };

    if (!point) {
      return response.status(400).json({ message: "Point not found" });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return response.json({ point: serializedPoint, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = await request.body;

    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return response.json({ id: point_id, ...point });
  }
}

export default PointsController;
