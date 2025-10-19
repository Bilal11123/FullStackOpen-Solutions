import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
    const [formVisible, setFormVisible] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState('')
    const [isError, setIsError] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const newUser = await loginService.login({ username, password })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(newUser)
            )
            blogService.setToken(newUser.token)
            setUser(newUser)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
            setNotification('Wrong username or password')
            setIsError(true)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    // console.log('logging in with', username, password)
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
        // setNotification('User Logged Out')
        // setIsError(false)
        // setTimeout(() => {
        //   setNotification(null)
        // }, 5000)
    }

    const addBlog = (blogObject) => {
        blogService.create(blogObject).then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
        })
        if(!blogObject.title || !blogObject.url || !blogObject.author){
            setNotification('Blog Values missing')
            setIsError(true)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } else {
            setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
            setIsError(false)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const updateBlog = (id, blogObject) => {
        blogService.update(id, blogObject).then(returnedBlog => {
            const newBlogs = blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog)
            const sortedBlogs = newBlogs.sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBlogs)
        })
    }

    const deleteBlog = (id) => {
        blogService.deleteBlog(id).then(() => {
            const newBlogs = blogs.filter(blog => blog.id !== id)
            const sortedBlogs = newBlogs.sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBlogs)
        })
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
                    <BlogForm
                        createBlog={addBlog}
                    />
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
                {notification && <Notification message={notification} isError={isError} />}
                {!user && loginForm()}
            </div>
        )
    }

    return (
        <div>
            <h1>Blogs</h1>
            {notification && <Notification message={notification} isError={isError} />}
            <div>
                {user.name} logged in
                <button onClick={handleLogout}>Logout</button>
            </div>
            {blogForm()}
            {blogs.map(blog =>
                <Blog key={blog.id}
                    blog={blog}
                    addLikes={updateBlog}
                    removeBlog={deleteBlog}
                    userName={user.name}
                />
            )}
        </div>
    )
}

export default App