import { Request, Response } from "express";
import knex from "../database/connection";
import jwt from "jsonwebtoken";

class AuuthenticateController {
  async index(request: Request, response: Response) {
    const { password, email } = await request.body;

    const point = await knex("points")
      .where("email", email)
      .where("password", password)
      .select("points.id")
      .select("points.uf")
      .select("points.name")
      .select("points.city")
      .select("points.latitude")
      .select("points.longitude")
      .select("points.whatsapp")
      .select("points.email")
      .select("points.image")
      .first();

    if (!point) {
      return response.json({
        message: "Email ou Senha incorreto",
        token: false,
      });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", point.id)
      .select("items.id");

    return response.json({
      items,
      point,
      token: jwt.sign(point, "PRIVATEKEY"),
    });
  }
}

export default AuuthenticateController;
