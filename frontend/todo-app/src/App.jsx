import { useState } from 'react'
import './App.css'


function App() {
  const [todo, setTodo] = useState({
    title:"goo",
    description:"wherever you want",
    id:1
  });

  setInterval(() => {
    setTodo({
      title:"goo home",
      description:"wherever you want to",
      id:1
    })
  }, 2000)

  return (
    <div>
      {todo.title}
      <br></br>
      {todo.description}
      <br></br>
      {todo.id}
    </div>

  )
}

export default App
