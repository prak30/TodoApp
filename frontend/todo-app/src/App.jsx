import { useEffect, useState } from 'react'


function App() {
  const [todo] = useState({
    title:"goo",
    description:"wherever you want",
    id:1
  });
  console.log("render")
  useEffect(() => {
    fetch("http://localhost:3001/todos").then((response) => {
      response.json().then((data) => {
        console.log(data)
      })
    })
    
  }, [])

  

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
