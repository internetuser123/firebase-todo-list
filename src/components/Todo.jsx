import React, {useState}  from "react"
import styles from "./Todo.module.css"

const Todo = (props) => {

    const {id, deleteTodo, desc, editTodo, toggle} = props;

    const [input, setInput] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    

    

    const handleSubmit = (event) => {
        console.log("edited form submitted with id:", id)
        event.preventDefault()
        editTodo(id, input)
        setInput("")
        setIsEditing(false)
    }

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const defaultTemplate = (
        <div className={styles.container}>
                <input 
                type="checkbox"
                id={id}
                onChange={() => toggle(id)}
                value={input} />
                {desc}
                <div>
                    <button className={styles.buttons} type="button" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className={styles.buttons} type="button" onClick={() => deleteTodo(id)}>Delete</button>
                </div>
            </div>
    )

    const editTemplate = (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    id={id}
                    onChange={handleChange}
                    value={input} />
                    {desc}
                    <div>
                        <button className={styles.buttons} type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        <button className={styles.buttons} type="submit">Save</button>
                    </div>
                </form>
            </div>
    )

    return ( <li className="list"> {isEditing ? editTemplate : defaultTemplate} </li> )
  }

  export default Todo;