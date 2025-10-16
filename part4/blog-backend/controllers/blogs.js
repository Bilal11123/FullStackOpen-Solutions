const blogRoutes = require('express').Router()
const Blog = require('../models/blog')

blogRoutes.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
    
})

blogRoutes.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (error) {
        next(error)
    }
    
})

blogRoutes.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        console.log(error)
        next(error)
    }    
})

blogRoutes.put('/:id', async (request, response, next) => {
    const { title, author, url, likes } = request.body
    try {
        const blog = await Blog.findById(request.params.id)
        if(!blog) return response.status(404).end();
        blog.title = title
        blog.author = author
        blog.url = url
        blog.likes = likes
        const updatedBlog = await blog.save()
        response.json(updatedBlog)
    } catch (error) {
        next(error)
    }    
})

module.exports = blogRoutes