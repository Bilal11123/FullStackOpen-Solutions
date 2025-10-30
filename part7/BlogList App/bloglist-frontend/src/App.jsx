import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import { useSelector, useDispatch } from 'react-redux'
import { notificationChange } from './reducers/notificationReducer'
import { initializeBlogs, appendBlog, addLikesOnBlog , deleteTheBlog } from './reducers/blogReducer'
import { initializeUser, setUser, clearUser } from './reducers/userReucer'

const App = () => {
    const dispatch = useDispatch()

    const [formVisible, setFormVisible] = useState(false)
    const blogs = useSelector(state => state.blogs)
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUser())
    }, [dispatch])

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const newUser = await loginService.login({ username, password })

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))
            blogService.setToken(newUser.token)
            dispatch(setUser(newUser))
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
            dispatch(notificationChange('Wrong username or password', true, 5))
        }
        // console.log('logging in with', username, password)
    }

    const handleLogout = () => {
        dispatch(clearUser())
        window.localStorage.removeItem('loggedBlogappUser')
        // setNotification('User Logged Out')
        // setIsError(false)
        // setTimeout(() => {
        //   setNotification(null)
        // }, 5000)
    }

    const addBlog = blogObject => {
        dispatch(appendBlog(blogObject))
        if (!blogObject.title || !blogObject.url || !blogObject.author) {
            dispatch(notificationChange('Blog Values missing', true, 5))
        } else {
            dispatch(notificationChange(`a new blog ${blogObject.title} by ${blogObject.author} added`, false, 5))
        }
    }

    const updateBlog = (id, blogObject) => {
        dispatch(addLikesOnBlog(id, blogObject))
    }

    const deleteBlog = id => {
        dispatch(deleteTheBlog(id))
    }

    const blogForm = () => {
        const hideWhenVisible = { display: formVisible ? 'none' : '' }
        const showWhenVisible = { display: formVisible ? '' : 'none' }
        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setFormVisible(true)}>Create New Blog</button>
                </div>
                <div style={showWhenVisible}>
                    <BlogForm createBlog={addBlog} />
                    <button onClick={() => setFormVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                <label>
                    username
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </label>
            </div>
            <button type="submit">login</button>
        </form>
    )

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                {/* {notification.notification && <Notification />} */}
                {loginForm()}
            </div>
        )
    }

    return (
        <div>
            <h1>Blogs</h1>
            <Notification />
            {/* {notification.notification && <Notification />} */}
            <div>
                {user.name} logged in
                <button onClick={handleLogout}>Logout</button>
            </div>
            {blogForm()}
            {blogs.map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    addLikes={updateBlog}
                    removeBlog={deleteBlog}
                    userName={user.name}
                />
            ))}
        </div>
    )
}

export default App
