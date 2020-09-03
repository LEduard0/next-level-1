import express, { request, response } from "express";
import knex from "./database/connection";

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

routes.get("/items", async (request, response) => {
  const items = await knex("items").select("*");

  const serializedItems = items.map((item) => {
    return {
      name: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
      id: item.id,
    };
  });

  return response.json(serializedItems);
});

routes.post("/points", async (request, response) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = request.body;

  const ids = await knex("points").insert({
    image: "img-fake",
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id: ids[0],
    };
  });

  await knex("point_items").insert(pointItems);

  return response.json({ success: true });
});

export default routes;
