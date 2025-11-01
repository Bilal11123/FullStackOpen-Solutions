import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }
    return(
        <div>
            <h2>Blogs</h2>
            {blogs.map(blog => (
                <li key={blog.id} className='blog' style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </li>
            ))}
            {/* {blogs.map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    addLikes={updateBlog}
                    removeBlog={deleteBlog}
                    userName={user.name}
                />
            ))} */}
        </div>
    )
    
}

export default BlogList
