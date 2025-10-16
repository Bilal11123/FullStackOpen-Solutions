const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper.js')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

// test('blogs are returned as json', async () => {
//     await api
//         .get('/api/blogs')
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
// })

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog id is "id" not "_id"', async () => {
    const response = await api.get('/api/blogs')
    const hasId = response.body.every(blog => blog.id)
    assert.strictEqual(hasId, true)
})

// test('a valid blog can be added ', async () => {
//     const newBlog = {
//         title: 'async/await simplifies making async calls',
//         author: 'Mardala re',
//         url: '',
//         likes: 5
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

//     const blogsAtEnd = await helper.blogsInDb()
//     console.log(blogsAtEnd.length, helper.initialBlogs.length + 1)
//     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

//     // const title = blogsAtEndsAtEnd.map((n) => n.title)
//     // assert(title.includes('async/await simplifies making async calls'))
// })

// test('if likes property is missing, it will default to 0', async () => {
//     const newBlog = {
//         title: 'Blog without likes',
//         author: 'Test Author',
//         url: 'http://example.com'
//         // no "likes" field
//     }

//     const response = await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

//     console.log(response.body)

//     assert.strictEqual(response.body.likes, 0)
// })

// test('blog without title is not added', async () => {
//     const newBlog = {
//         author: 'Test Author',
//         url: 'http://example.com',
//         likes: 5
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(400)
// })

// test('blog without url is not added', async () => {
//     const newBlog = {
//         title: 'Missing URL',
//         author: 'Test Author',
//         likes: 5
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(400)
// })

test('A blog is deleted', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToDelete = allBlogs[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((b) => b.title)
    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('A blog is updated', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs[0]
    const updates = {
        title: 'New Title',
        author: 'New Author',
        url: 'New URL',
        likes: 919
    }
    const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(updates).expect(200)
    assert.strictEqual(updatedBlog.body.title, updates.title)
})
after(async () => {
    await mongoose.connection.close()
})