import React, {useState}  from "react"

const Todo = (props) => {

    const {id, deleteTodo, desc, editTodo, toggle} = props;

    const [input, setInput] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    

    

    const handleSubmit = (event) => {
        console.log("edited form submitted with id:", id)
        event.preventDefault()
        editTodo(id, input)
        setInput("")
    }

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const defaultTemplate = (
        <div>
                <input 
                type="checkbox"
                id={id}
                onChange={() => toggle(id)}
                value={input} />
                {desc}
                <div>
                    <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                    <button type="button" onClick={() => deleteTodo(id)}>Delete</button>
                </div>
            </div>
    )

    const editTemplate = (
        <form onSubmit={handleSubmit}>
                <input 
                type="text"
                id={id}
                onChange={handleChange}
                value={input} />
                {desc}
                <div>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
    )

    return ( <li className="list"> {isEditing ? editTemplate : defaultTemplate} </li> )
  }

  export default Todo;