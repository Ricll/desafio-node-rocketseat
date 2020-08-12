const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());


const repositories = [];


app.get("/repositories", (request, response) => {

  const { title } = request.query;

  const results = title
    ? repositories.filter(item => item.title.includes(title)) : repositories;

  return response.json(results);

});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository)

});


app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const { title, url, techs } = request.body;

  const repositoryUpdate = repositories.findIndex(item => item.id === id)

  if (repositoryUpdate < 0) {
    return response.status(400).json({ error: 'Repository not found' })
  }

  const repo = repositories.find(item => item.id === id)

  const repositoryUpdated = {
    id: id,
    title: title,
    url: url,
    techs: techs,
    likes: repo['likes']
  }
  repositories[repositoryUpdate] = repositoryUpdated;

  return response.json(repositoryUpdated)
});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repositoryDelete = repositories.findIndex(item => item.id === id);

  if (repositoryDelete < 0) {
    return response.status(400).json({ error: 'Repository not found' })
  };

  repositories.splice(repositoryDelete, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const { likes, title } = request.body;

  const repositoryUpdate = repositories.findIndex(item => item.id === id)


  const repo = repositories.find(item => item.id === id)


  if (repositoryUpdate < 0) {
    return response.status(400).json({ error: 'Repository not found' })
  }


  const repositoryUpdated = {
    id: `${repo['id']}`,
    title: `${repo['title']}`,
    url: `${repo['url']}`,
    techs: `${repo['techs']}`,
    likes: repo['likes'] += 1

  }

  repositories[repositoryUpdate] = repositoryUpdated;

  return response.json(repositoryUpdated)
});

module.exports = app;