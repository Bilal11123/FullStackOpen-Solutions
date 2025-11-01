import userService from "../services/users"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const UserList = ({ users }) => {
    // const [users, setUsers] = useState([])
    // useEffect(() => {
    //     userService.getAll().then(response =>
    //         setUsers(response)
    //     )
    // }, [])
    return (
        <div>
            <h2>Users</h2>
            {users.map(user => (
                <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                </li>
            ))}
        </div>
    )
}

export default UserList