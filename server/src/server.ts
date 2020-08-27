import express from "express";

const app = express();

app.get("/users", (request, response) => {
  console.log("list users");

  response.json(["Luiz", "Eduardo", "Queiroz"]);
});

app.listen(3333);
