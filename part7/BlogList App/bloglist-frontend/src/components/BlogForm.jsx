import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()

    const addBlog = event => {
        event.preventDefault()
        dispatch(appendBlog({
            title: title,
            author: author,
            url: url
        }))
        if (!title || !url || !author) {
            dispatch(notificationChange('Blog Values missing', true, 5))
        } else {
            dispatch(notificationChange(`a new blog ${title} by ${author} added`, false, 5))
        }
        setAuthor('')
        setTitle('')
        setUrl('')
    }
    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    <label>
                        title
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        author
                        <input
                            type="text"
                            name="author"
                            value={author}
                            onChange={event => setAuthor(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        url
                        <input
                            type="text"
                            name="url"
                            value={url}
                            onChange={event => setUrl(event.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
