import { useEffect, useState } from 'react'


function App() {
  const [todo, setTodo] = useState({
    title:"goo",
    description:"wherever you want",
    id:1
  });

  useEffect(() => {
    console.log("from useEffect hook")
  }, [])

  console.log("render")
  setInterval(() => {
    setTodo({
      title:"goo home" + Math.random(),
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
      <br></br>
      <Name firstName={"pranav"} lastName={"katkar"}></Name>
    </div>

  )
}

function Name(props) {
  return <div>
    {props.firstName} {props.lastName}
  </div>
}

export default App
