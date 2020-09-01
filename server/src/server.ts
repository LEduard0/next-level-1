import express, { request } from "express";

const app = express();

app.use(express.json());

const users = ["Luiz", "Eduardo", "Queiroz"];

app.get("/users", (request, response) => {
  const search = String(request.query.search);

  const filteredUsers = search
    ? users.filter((user) => user.includes(search))
    : users;

  return response.json(filteredUsers);
});

app.get("/users/:id", (request, response) => {
  const id = Number(request.params.id),
    user = users[id];

  return response.json(user);
});

app.post("/users", (req, res) => {
  const data = req.body;

  const user = {
    name: data.name,
    email: data.email,
  };

  return res.json(user);
});

app.listen(3333);
