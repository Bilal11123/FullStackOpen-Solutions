import { addLikesOnBlog, deleteTheBlog, addCommentOnBlog } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log(blog)

    const [comment, setComment] = useState('')
    
    const updateBlog = event => {
        event.preventDefault()
        const newLike = blog.likes + 1
        dispatch(addLikesOnBlog(blog.id, {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: newLike,
        }))
    }

    const deleteBlog = event => {
        event.preventDefault()
        if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteTheBlog(blog.id))
        }
    }

    const deleteButton = () => (
        <div>
            <button onClick={deleteBlog}>remove</button>
        </div>
    )

    const commentsList = () => (
        <div>
            <ul>
                {blog.comments.map(comment => (
                    <li key={comment.id}>
                        {comment.content}
                    </li>
                ))}
            </ul>
        </div>
    )
    const postComment = (id, comment) => {
        dispatch(addCommentOnBlog(id, comment))
    }

    const addComment = event => {
        event.preventDefault()
        console.log(blog.id)
        postComment(blog.id, comment)
    }
    if (!blog){
        return <div>Blog not found...</div>
    }
    return (
        <div>
            <div>
                <h2>{blog.title} {blog.author}</h2>
            </div>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>
                likes {blog.likes}
                <button onClick={updateBlog}>like</button>
            </div>
            <div>{blog.user.name}</div>
            <div>added by {blog.user.name}</div>
            {blog.user.name === user.name && deleteButton()}
            <br />
            <h3>comments</h3>
            <form onSubmit={addComment}>
                <label>
                    New-Comment
                    <input
                        type="text"
                        name="newComment"
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                    />
                </label>
                <button type="submit">add comment</button>
            </form>
            {blog.comments && commentsList()}

        </div>
    )
}

export default Blog
