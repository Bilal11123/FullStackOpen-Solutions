import {
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material'

const User = ({ user }) => {
    if (!user) {
        return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="body1">User not found...</Typography>
        </Container>
        )
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" gutterBottom>
            {user.name}
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
            Added Blogs
            </Typography>

            {user.blogs.length > 0 ? (
            <List>
                {user.blogs.map((blog) => (
                <ListItem key={blog.id} disablePadding>
                    <ListItemText primary={blog.title} />
                </ListItem>
                ))}
            </List>
            ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                No blogs added yet.
            </Typography>
            )}

            <Divider sx={{ mt: 2 }} />
        </Paper>
        </Container>
    )
}

export default User
