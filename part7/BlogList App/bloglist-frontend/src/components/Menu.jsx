import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box
} from '@mui/material'

const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const padding = {
        paddingRight: 5,
        paddingLeft: 5
    }
    const handleLogout = () => {
        dispatch(clearUser())
        window.localStorage.removeItem('loggedBlogappUser')
    }
    return (
    <AppBar position="static" color="primary">
        <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/users">
                Users
            </Button>
            <Button color="inherit" component={Link} to="/create">
                Create
            </Button>
            <Button color="inherit" component={Link} to="/">
                Blogs
            </Button>
            </Box>
            {user && (
            <>
                <Typography variant="body1" sx={{ mr: 2 }}>
                    {user.name} logged in
                </Typography>
                <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{ bgcolor: 'white', color: 'primary.main', borderColor: 'white' }}
                >
                    Logout
                </Button>
            </>
            )}
        </Toolbar>
        </AppBar>
    )
}

export default Menu