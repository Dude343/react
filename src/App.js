import React, {useEffect} from 'react'
import Context from './context'
import AddTodo from './Todo/AddTodo'
import TodoList from './Todo/TodoList'
 

function App() {

  const [todos, setTodos] = React.useState([])

    useEffect(()=> {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
          setTodos(todos)
        })
    }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo=>{
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }


  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false
        }
      ])  
    )
  }


  return (
    <Context.Provider value={{removeTodo}}>
      <div className="wrapper">
        <h1>Преколы</h1>
        <AddTodo onCreate={addTodo}/>
        {todos.length ? <TodoList todos={todos} onToggle={toggleTodo}/> : <p>Пусто, давай по-новой, Миша, все хуйня</p>} 
        
      </div>
    </Context.Provider>
  )
}

export default App  