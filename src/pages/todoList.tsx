import { useParams } from 'react-router-dom'

function ToDoList() {
    const { id } = useParams()
    console.log(id)
    return <div>Current list: {id}</div>
}

export default ToDoList
