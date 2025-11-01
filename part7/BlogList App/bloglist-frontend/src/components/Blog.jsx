import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { addLikesOnBlog, deleteTheBlog, addCommentOnBlog } from '../reducers/blogReducer'
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Divider
} from '@mui/material'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  if (!blog) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="body1">Blog not found...</Typography>
      </Container>
    )
  }

  const updateBlog = (event) => {
    event.preventDefault()
    const newLike = blog.likes + 1
    dispatch(addLikesOnBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLike
    }))
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove Blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteTheBlog(blog.id))
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(addCommentOnBlog(blog.id, comment))
    setComment('')
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          {blog.title} — {blog.author}
        </Typography>

        <MuiLink
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="primary"
          sx={{ display: 'block', mb: 1 }}
        >
          {blog.url}
        </MuiLink>

        <Typography variant="body1" sx={{ mb: 1 }}>
          Likes: {blog.likes}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={updateBlog}
          sx={{ mr: 2 }}
        >
          Like
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Added by {blog.user?.name}
        </Typography>

        {blog.user?.name === user.name && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={deleteBlog}
            sx={{ mt: 2 }}
          >
            Remove
          </Button>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>

        <Box component="form" onSubmit={addComment} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="New Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth>
            Add Comment
          </Button>
        </Box>

        {blog.comments && blog.comments.length > 0 ? (
          <List>
            {blog.comments.map((c) => (
              <ListItem key={c.id} disablePadding>
                <ListItemText primary={c.content} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No comments yet.
          </Typography>
        )}
      </Paper>
    </Container>
  )
}

export default Blog
