/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';



//custom hook - hook which encapsulates another hook and returns a state variable
function useTodos(){
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/todos").then((response) => {
      let data = response.data;
      console.log(data);
      setTodos(data);
    })

    setInterval(() => {
      axios.get("http://localhost:3001/todos").then((response) => {
      let data = response.data;
      console.log(data);
      setTodos(data);
    })
    }, 1000);
    
  }, [])
  return todos
}


function App() {
  
const todos = useTodos();
  

  return (
    <div>
      {todos.map(todo => {
        return <div>
          {todo.title}
          {todo.description}
          <br></br>
          <Button variant="contained">Delete</Button>
        </div>
      })}
    </div>

  )
}


export default App
