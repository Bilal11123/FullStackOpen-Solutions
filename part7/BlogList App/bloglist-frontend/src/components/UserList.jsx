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

const UserList = ({ users }) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ p: 2 }}>
            Users
        </Typography>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell align="right"><strong>Blogs Created</strong></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user) => (
                <TableRow key={user.id}>
                <TableCell>
                    <Link
                    to={`/users/${user.id}`}
                    style={{ textDecoration: 'none', color: '#1976d2' }}
                    >
                    {user.name}
                    </Link>
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    )
}

export default UserList
