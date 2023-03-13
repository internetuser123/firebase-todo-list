import Todo from './Todo'
import React, {useState, useEffect} from "react"
import { addTodosDB, fetchFromDB, updateTodosDB, deleteTodoDB } from "../db/operation"
import styles from "./TodoList.module.css"

const TodoList = () => {

    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])
    const [toggled, setToggled] = useState(false)
   

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
            date: new Date
        }
        addTodosDB(newTodo)
        setTodos([...todos, newTodo])
        console.log(newTodo)

    }

    const toggle = (id) => {
        toggled ? setToggled(false) : setToggled(true)

        const editedList = todos.map(item => {
            if (id === item.id) {
                updateTodosDB(id, {...item, completed: !item.completed})
                return {...item, completed: !item.completed}
            }
            return item
        })
        setTodos(editedList)
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
            console.log(todos)
        })
    }, [todos.length])

    


    return (
        <div className={styles.container}>
            <h1>Todolist with React and Firebase</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="">Add a todo: </label>
            <input type="text" onChange={handleChange} value={input} />
            <button className={styles.button} type="submit">Add todo</button>
            </form>
            <ul className={styles.list}>
                {todos.sort((a, b) => b.date - a.date).map(item => {
                    return <Todo
                    key={item.id || new Date()}
                    id={item.id || new Date()}
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