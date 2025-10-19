import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')
  const [isError, setIsError] = useState(false)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleLogout = (event) => {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
      // setNotification('User Logged Out')
      // setIsError(false)
      // setTimeout(() => {
      //   setNotification(null)
      // }, 5000)
  }

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setAuthor('')
      setTitle('')
      setUrl('')
    })
    if(!title && !url && !author){
      setNotification('Blog Values missing')
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } else {
      setNotification(`a new blog ${title} by ${author} added`)
      setIsError(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
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
      <h2>Create New</h2>
      <div>
        <form onSubmit={addBlog}>
          <div>
            <label>
              title
              <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                />
            </label>
          </div>
          <div>
              <label>
              author
              <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url
              <input
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </label>
          </div>          
          <button type="submit">create</button>
      </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App