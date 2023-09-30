import './App.css'


const todo = {
  title:"goo",
  description:"wherever you want",
  id:1
}
function App() {

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
