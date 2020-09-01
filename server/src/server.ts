import express from "express";

const app = express();

app.get("/users", (request, response) => {
  return response.json(["Luiz", "Eduardo", "Queiroz"]);
});

app.post("/users", (req, res) => {
  const user = {
    name: "Luiz",
    email: "leduardo152@gmail.com",
  };

  return res.json(user);
});

app.listen(3333);
