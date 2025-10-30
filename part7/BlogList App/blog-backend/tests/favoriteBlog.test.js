const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('favourite Blog', () => {
    const listBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Health Science and IT',
            author: 'Muhammad Bilal',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 10,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'A wonderful book',
            author: 'JJK',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 25,
            __v: 0,
        },
    ]

    const listBlogs2 = [
        {
            _id: '5a422aa71b54a676234d17f1',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f2',
            title: 'Sports Science',
            author: 'Muhammad Arshad',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 25,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f3',
            title: 'Health Science and IT',
            author: 'Muhammad Bilal',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 10,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f4',
            title: 'A wonderful book',
            author: 'JJK',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 25,
            __v: 0,
        },
    ]

    test('of empty list is null', () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, null)
    })

    test('when list has only one blog, equals that', () => {
        const result = listHelper.favoriteBlog([listBlogs[0]])
        assert.strictEqual(result, listBlogs[0])
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.favoriteBlog(listBlogs)
        assert.strictEqual(result, listBlogs[2])
    })

    test('of a bigger list with two max likes is calculated right', () => {
        const result = listHelper.favoriteBlog(listBlogs2)
        assert.strictEqual(result, listBlogs2[1])
    })
})
