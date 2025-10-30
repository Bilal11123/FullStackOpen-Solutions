const blogRoutes = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
const jwt = require('jsonwebtoken')

blogRoutes.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogRoutes.post('/', userExtractor, async (request, response, next) => {
    const body = request.body
    const user = request.user

    if (!user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })
    try {
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        const populatedBlog = await result.populate('user', { username: 1, name: 1 })
        response.status(201).json(populatedBlog)
        // response.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

blogRoutes.delete('/:id', userExtractor, async (request, response, next) => {
    try {
        const user = request.user
        const blog = await Blog.findById(request.params.id)
        if (!blog) {
            return response.status(401).json({ error: 'invalid blog id' })
        }
        if (!(blog.user.toString() === user.id.toString())) {
            return response.status(401).json({ error: 'invalid user' })
        }
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// blogRoutes.put('/:id', async (request, response, next) => {
//     const { title, author, url, likes, user } = request.body
//     try {
//         const blog = await Blog.findById(request.params.id)
//         if(!blog) return response.status(404).end();
//         blog.title = title
//         blog.author = author
//         blog.url = url
//         blog.likes = likes
//         blog.user = user
//         const updatedBlog = await blog.save()
//         response.json(updatedBlog)
//     } catch (error) {
//         next(error)
//     }
// })

blogRoutes.put('/:id', async (request, response, next) => {
    const { title, author, url, likes } = request.body
    const updateData = { title, author, url, likes }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updateData, {
            new: true,
            runValidators: true,
        }).populate('user', { username: 1, name: 1 })

        if (!updatedBlog) return response.status(404).end()
        response.json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = blogRoutes
