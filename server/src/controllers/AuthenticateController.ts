import { Request, Response } from "express";
import knex from "../database/connection";
import jwt from "jsonwebtoken";

class AuuthenticateController {
  async index(request: Request, response: Response) {
    const { password, email } = await request.body;

    const point = await knex("points")
      .where("email", email)
      .where("password", password)
      .first();

    if (!point) {
      return response.json({ message: "usuario ou senha incorreto", token: false });
    }

    return response.json({
      point,
      token: jwt.sign(point, "PRIVATEKEY"),
    });
  }
}

export default AuuthenticateController;
