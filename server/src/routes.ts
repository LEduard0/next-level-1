import express from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";
import AuthenticateController from "./controllers/AuthenticateController";

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();
const authenticateController = new AuthenticateController();

routes.get("/items", itemsController.index);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

routes.post(
  "/authenticate",
  celebrate(
    {
      body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  authenticateController.index
);

routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
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

routes.put("/points/:id", pointsController.update);

export default routes;
