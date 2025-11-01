import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        createBlog(state, action) {
            return [...state, action.payload]
        },
        addLikesOn(state, action) {
            const id = action.payload
            const blogToChange = state.find(b => b.id === id)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1
            }
            const updatedBlogs = state.map(blog => (blog.id !== id ? blog : changedBlog))
            return updatedBlogs.sort((a, b) => b.likes - a.likes)
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        },
        setBlogs(state, action) {
            return action.payload
        },
        addComment(state, action) {
            const updatedBlog = action.payload
            return state.map(blog =>
                blog.id !== updatedBlog.id ? blog : updatedBlog
            )
        }
    }
})

const { createBlog, addLikesOn, removeBlog, setBlogs, addComment } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        dispatch(setBlogs(sortedBlogs))
    }
}

export const addCommentOnBlog = (id, comment) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.addComment(id, comment)
        dispatch(addComment(updatedBlog))
    }
}

export const appendBlog = (blogObject) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blogObject)
        dispatch(createBlog(newBlog))
    }
}

export const addLikesOnBlog = (id, blogObject) => {
    return async (dispatch) => {
        const returnedBlog = await blogService.update(id, blogObject)
        dispatch(addLikesOn(id))
    }
}

export const deleteTheBlog = (id) => {
    return async (dispatch) => {
        const returnedBlog = await blogService.deleteBlog(id)
        dispatch(removeBlog(id))
    }
}

export default blogSlice.reducer