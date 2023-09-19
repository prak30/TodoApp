const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 3001;
const todosFilePath = path.join(__dirname, 'todos.json');
let count = 1;

// Function to read todos from the file
function readTodosFromFile() {
  try {
    const todosData = fs.readFileSync(todosFilePath, 'utf8');
    return JSON.parse(todosData);
  } catch (err) {
    return [];
  }
}

// Function to write todos to the file
function writeTodosToFile(todos) {
  fs.writeFileSync(todosFilePath, JSON.stringify(todos,null,2), 'utf8');
}

app.get('/todos', (req, res) => {
  const todos = readTodosFromFile();
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const todos = readTodosFromFile();
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    res.status(404).send();
  } else {
    res.json(todo);
  }
});

app.post('/todos', (req, res) => {
  const todos = readTodosFromFile();
  const newTodo = {
    id: count,
    title: req.body.title,
    description: req.body.description,
  };
  count = count + 1;
  todos.push(newTodo);
  writeTodosToFile(todos);
  res.status(201).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  const todos = readTodosFromFile();
  const id = parseInt(req.params.id);
  const delIndex = todos.findIndex((todo) => todo.id === id);
  if (delIndex === -1) {
    res.status(404).send();
  } else {
    todos.splice(delIndex, 1);
    writeTodosToFile(todos);
    res.status(204).send(); // 204 No Content for successful deletion
  }
});

app.put('/todos/:id', (req, res) => {
  const todos = readTodosFromFile();
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    writeTodosToFile(todos);
    res.json(todos[todoIndex]);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
