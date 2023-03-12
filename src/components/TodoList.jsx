import Todo from './Todo'
import React, {useState, useEffect} from "react"
import { addTodosDB, fetchFromDB, updateTodosDB, deleteTodoDB } from "../db/operation"
import styles from "./TodoList.module.css"

const TodoList = () => {

    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])
   

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addTodo();
        setInput("");
    }

    const addTodo = () => {
        const newTodo = {
            desc: input, 
            completed: false,
        }
        addTodosDB(newTodo)
        setTodos([...todos, newTodo])

    }

    const toggle = (id) => {
        console.log("försöker toggla")
    }

    const editTodo = (id, newDesc) => {
        const editedList = todos.map(item => {
            if (id === item.id) {
                updateTodosDB(id, {...item, desc: newDesc})
                return {...item, desc: newDesc}
            }
            return item
        })
        setTodos(editedList)
    }

    const deleteTodo = (id) => {
        console.log("delete todo")
        const remainingTodos = todos.filter(item => {
            return id !== item.id;
        })

        deleteTodoDB(id)
        setTodos(remainingTodos)
    }

    useEffect(() => {
        console.log("Use effect körs")
        fetchFromDB().then((newTodo) => {
            setTodos(newTodo)
        })
    }, [todos.length])

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="">Add a todo: </label>
            <input type="text" onChange={handleChange} value={input} />
            <button type="submit">Add todo</button>
            </form>
            <ul className={styles.list}>
                {todos.map(item => {
                    return <Todo
                    key={item.id}
                    id={item.id}
                    desc={item.desc}
                    completed={item.completed}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    toggle={toggle}
                    />
                    
                })}
            </ul>
        </div>
    )
  }

  export default TodoList;