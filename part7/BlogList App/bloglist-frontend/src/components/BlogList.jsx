import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@mui/material'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)

    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ p: 2 }}>
            Blogs
        </Typography>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Author</strong></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {blogs.map((blog) => (
                <TableRow
                key={blog.id}
                hover
                sx={{ cursor: 'pointer' }}
                >
                <TableCell>
                    <Link
                    to={`/blogs/${blog.id}`}
                    style={{ textDecoration: 'none', color: '#1976d2' }}
                    >
                    {blog.title}
                    </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    )
}

export default BlogList
