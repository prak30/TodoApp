/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'


function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/todos").then((response) => {
      response.json().then((data) => {
        console.log(data)
        setTodos(data);
      })
    })
    
  }, [])

  

  return (
    <div>
      {todos.map(todo => {
        return <div>
          {todo.title}
          {todo.description}
          <button>DELETE</button>
        </div>
      })}
    </div>

  )
}


export default App
