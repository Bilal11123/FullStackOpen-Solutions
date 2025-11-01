import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

import { useSelector, useDispatch } from 'react-redux'
import { notificationChange } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, setUser } from './reducers/userReducer'

import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import Menu from './components/Menu'

import UserList from './components/UserList'
import userService from './services/users'
import User from './components/User'

import { Container, TextField, Button, Paper, Typography, Box } from '@mui/material'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUser())
    }, [dispatch])

    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.getAll().then(response =>
            setUsers(response)
        )
    }, [])

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const newUser = await loginService.login({ username, password })

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))
            blogService.setToken(newUser.token)
            dispatch(setUser(newUser))
            setUsername('')
            setPassword('')
            navigate('/')
        } catch (error) {
            console.log(error)
            dispatch(notificationChange('Wrong username or password', true, 5))
        }
        // console.log('logging in with', username, password)
    }

    const loginForm = () => (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
            Login
            </Typography>
            <Box component="form" onSubmit={handleLogin}>
            <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
            >
                Login
            </Button>
            </Box>
        </Paper>
        </Container>
    )

    const blogMatch = useMatch('/blogs/:id')
    const blogFound = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

    const userMatch = useMatch('/users/:id')
    const userFound = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                {loginForm()}
            </div>
        )
    }    

    return (
        <Container>
        <div>
            <Menu />
            <h1>Blog app</h1>
            <Notification />
            <Routes>
                <Route path="/create" element={<BlogForm />} />
                <Route path="/" element={<BlogList />} />
                <Route path="/blogs/:id" element={<Blog blog={blogFound} />} />
                <Route path="/users" element={<UserList users={users}/>} />
                <Route path="/users/:id" element={<User user={userFound} />} />
            </Routes>
        </div>
        </Container>
    )
}

export default App
