const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
const port = 3001
let count =0;

let todos = [];

app.get('/todos', (req,res) => {
    res.json(todos);
})

app.get('/todos/:id', (req,res)=>{
    let id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).send();
    } else {
        res.json(todo);
  }
})

app.post('/todos', (req,res)=>{
    let newTodo = {
        id: count,
        title:req.body.title,
        description:req.body.description
    }
    count = count+1
    todos.push(newTodo);
    res.status(201).json(newTodo);
})

app.delete('/todos/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    const delIndex = todos.findIndex(todo => todo.id === id)
    if (delIndex === -1) {
        res.status(404).send();
    } else {
        todos.splice(delIndex, 1);
        res.status(200).json("todo with request id " + id +  " deleted successfully");
  }
})

app.put('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id))
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      todos[todoIndex].title = req.body.title;
      todos[todoIndex].description = req.body.description;
      res.json(todos[todoIndex]);
    }
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})