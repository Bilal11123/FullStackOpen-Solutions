const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const assert = require('node:assert')
const { test, describe, after, beforeEach, before } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const api = supertest(app)

let token
let userId

before(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const savedUser = await user.save()

    const userForToken = {
        username: savedUser.username,
        id: savedUser._id
    }
    userId = savedUser._id
    token = jwt.sign(userForToken, process.env.SECRET)
})

describe('when there is initially one user and token is used', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    })

    test('a valid blog can be added with a token', async () => {
        const newBlog = {
            title: 'Token Protected Blog',
            author: 'Auth Tester',
            url: 'http://testurl.com',
            likes: 10
        }

        await api
            .post('/api/blogs')  // ✅ fixed
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, 1)
        assert.strictEqual(blogsAtEnd[0].title, 'Token Protected Blog')
    })

    test('adding a blog fails with status code 401 if no token is provided', async () => {
        const newBlog = {
            title: 'Unauthorized Blog',
            author: 'No Auth',
            url: 'http://unauthorized.com',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, 0)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})
