import { useState } from 'react'

const Blog = ({ blog, addLikes, removeBlog, userName }) => {
    const [display, setDisplay] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const updateBlog = (event) => {
        event.preventDefault()
        const newLike = blog.likes + 1
        addLikes(blog.id, {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: newLike,
        })
    }

    const deleteBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
            removeBlog(blog.id)
        }
    }

    const deleteButton = () => (
        <div>
            <button onClick={deleteBlog}>remove</button>
        </div>
    )
    if (!display){
        return (
            <div style={blogStyle}>
                <div>
                    {blog.title} {blog.author}
                    <button onClick={() => setDisplay(true)}>view</button>
                </div>
            </div>
        )
    }
    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button onClick={() => setDisplay(false)}>hide</button>
            </div>
            <div>{blog.url}</div>
            <div>
        likes {blog.likes}
                <button onClick={updateBlog}>like</button>
            </div>
            <div>{blog.user.name}</div>
            {blog.user.name === userName && deleteButton()}

        </div>
    )
}

export default Blog