const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('Most Blogs', () => {
    const listBlogs = [
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
            author: 'Muhammad Bilal',
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
        const result = listHelper.mostBlogs([])
        assert.deepStrictEqual(result, null)
    })

    test('when list has only one blog, equals that', () => {
        const result = listHelper.mostBlogs([listBlogs[0]])
        assert.deepStrictEqual(result, { author: listBlogs[0].author, blogs: 1 })
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostBlogs(listBlogs)
        assert.deepStrictEqual(result, { author: 'Muhammad Bilal', blogs: 2 })
    })
})
