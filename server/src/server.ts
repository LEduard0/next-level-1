import express from "express";

const app = express();

const users = ["Luiz", "Eduardo", "Queiroz"];

app.get("/users", (request, response) => {
  return response.json(users);
});

app.get("/users/:id", (request, response) => {
  const id = Number(request.params.id),
    user = users[id];

  return response.json(user);
});

app.post("/users", (req, res) => {
  const user = {
    name: "Luiz",
    email: "leduardo152@gmail.com",
  };

  return res.json(user);
});

app.listen(3333);
