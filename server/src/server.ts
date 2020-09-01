import express from "express";

const app = express();

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
  const user = {
    name: "Luiz",
    email: "leduardo152@gmail.com",
  };

  return res.json(user);
});

app.listen(3333);
