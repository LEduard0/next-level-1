import express from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

routes.post("/authenticate", (req: Request, res: Response) => {
  const user = {
    id: 1,
    name: "Luiz Eduardo",
    company: "Teste",
  };

  return res.json({
    user,
    token: jwt.sign(user, "PRIVATEKEY"),
  });
});

routes.get("/users", async (req: Request, res: Response) => {
  return res.json([
    {
      id: 1,
      name: "Mateus Silva",
      website: "https://devacademy.com.br",
    },
    {
      id: 2,
      name: "Mark Zuckerberg",
      website: "https://facebook.com",
    },
    {
      id: 3,
      name: "Bill Gates",
      website: "https://www.microsoft.com",
    },
  ]);
});

routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  pointsController.create
);

export default routes;
