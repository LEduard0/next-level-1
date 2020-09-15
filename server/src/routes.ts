import express from "express";

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json(["Luiz", "Eduardo", "Queiroz"]);
});

export default routes