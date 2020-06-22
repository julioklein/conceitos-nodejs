const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // DONE
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // DONE
  const { title, url, techs } = request.body;

  const project = { 
    id: uuid(),
    title, 
    url, 
    techs, 
    likes: 0 
  };

  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  // DONE
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const project = repositories.find(project => project.id === id);

  if(!project) {
    return response.status(400).json({ error: "Invalid Project ID" });
  }

  project.title = title;
  project.url = url;
  project.techs = techs;

  return response.json(project);
});

app.delete("/repositories/:id", (request, response) => {
  // DONE
  const { id } = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({ error: "Invalid Project ID." });
  }

  repositories.splice(projectIndex, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // DONE
  const { id } = request.params;

  const project = repositories.find(project => project.id === id);

  if(!project) {
    return response.status(400).json({ error: "Invalid Project ID." });
  }

  project.likes += 1;

  return response.json(project);
});

module.exports = app;
