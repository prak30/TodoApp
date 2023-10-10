const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');


const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3001;

//Define mongoose schema
const todoSchema = new mongoose.Schema({
    title : String,
    description : String
})

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})
//Define mongoose model
const Todo = mongoose.model('Todo', todoSchema);
const User = mongoose.model('User', userSchema);

//connect to mongodb
mongoose.connect('mongodb+srv://pranavv:katkar@cluster0.oqehcar.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signup', async (req,res) => {
  const { email, password } = req.body;
  try {
    // Create a new user document
    const newUser = new User({email, password});
    console.log(newUser);
    // Save the user to the database
    const savedUser = await newUser.save();
    console.log(savedUser)
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.post('/todos', async (req, res) => {
  const {title, description} = req.body
  try {
    const newTodo = new Todo({ title, description });
    console.log(newTodo);

    const savedTodo = await newTodo.save();
    console.log(savedTodo);

    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req.body is", req.body)

    // Find the user by email
    const user = await User.findOne({ email });
    console.log("user", user.email , user.password)

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log("password", password);

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(isPasswordValid)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const todo = await Todo.findById(id);
      if (!todo) {
        res.status(404).send();
      } else {
        res.json(todo);
      }
    } catch (error) {
      console.error('Error fetching todo by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/todos', async (req, res) => {
  const {title, description} = req.body
  try {
    const newTodo = new Todo({ title, description });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Todo.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        res.status(404).send();
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedTodo) {
         res.status(404).send();
        } else {
        res.json(updatedTodo);
    }
    } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// { 
//   "email" : "prnvk@gmail.com" ,
//   "password" : "pkatas"
// }