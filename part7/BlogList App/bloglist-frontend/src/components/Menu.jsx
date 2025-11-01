import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const padding = {
        paddingRight: 5,
        paddingLeft: 5
    }
    const handleLogout = () => {
        dispatch(clearUser())
        window.localStorage.removeItem('loggedBlogappUser')
    }
    return (
        <div className='menu'>
            <Link style={padding} to="/users">users</Link>
            <Link style={padding} to="/create">create</Link>
            <Link style={padding} to="/">blogs</Link>
            <span style={padding}>{user.name} logged in</span>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Menu