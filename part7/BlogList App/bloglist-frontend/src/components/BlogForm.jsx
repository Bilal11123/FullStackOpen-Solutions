import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box
} from '@mui/material'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()
        dispatch(appendBlog({ title, author, url }))

        if (!title || !url || !author) {
            dispatch(notificationChange('Blog values missing', true, 5))
        } else {
            dispatch(notificationChange(`A new blog "${title}" by ${author} added`, false, 5))
        }

        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom align="center">
            Create New Blog
            </Typography>

            <Box component="form" onSubmit={addBlog}>
            <TextField
                fullWidth
                label="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="URL"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
            >
                Create
            </Button>
            </Box>
        </Paper>
        </Container>
    )
}

export default BlogForm
