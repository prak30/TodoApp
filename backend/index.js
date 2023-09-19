const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
const port = 3001
let count =0;

let todos = [];

app.get('/todos', (req,res) => {
    res.send(todos);
})

function findIndex(arr, id){
    for(let i =0; i<arr.length; i++) {
        if(arr[i].id === id){
            return i;
        }
    }
    return -1;
}

app.get('/todos/:id', (req,res)=>{
    let id = parseInt(req.params.id);
    const todoIndex = findIndex(todos, id);
    if (todoIndex === -1) {
        res.status(404).send();
    } else {
        res.json(todos[todoIndex]);
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

function deleteIndex(arr, id){
    let delArr = [];
    for(let i =0; i<arr.length; i++){
        if(i != id){
            delArr.push(arr[i])
        }
    }
    return delArr;
}

app.delete('/todos/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    const delIndex = findIndex(todos, id)
    if (delIndex === -1) {
        res.status(404).send();
    } else {
        todos = deleteIndex(todos, delIndex);
        res.status(200).json("todo with request id " + id +  " deleted successfully");
  }
})

app.put('/todos/:id', (req, res) => {
    const todoIndex = findIndex(todos, parseInt(req.params.id));
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