const dummy = (blogs) => {
  // ...
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, curr) => {
        return curr.likes > prev.likes ? curr : prev
    }

    return blogs.length === 0 ? null : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    const authorBlogCount = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
    }, {})

    const mostBlogsAuthor = Object.keys(authorBlogCount).reduce((prev, curr) => {
        return authorBlogCount[curr] > authorBlogCount[prev] ? curr : prev
    }, Object.keys(authorBlogCount)[0])

    return {
        author: mostBlogsAuthor,
        blogs: authorBlogCount[mostBlogsAuthor]
    }
}
const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
    const authorLikeCount = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc
    }, {})

    const mostLikesAuthor = Object.keys(authorLikeCount).reduce((prev, curr) => {
        return authorLikeCount[curr] > authorLikeCount[prev] ? curr : prev
    }, Object.keys(authorLikeCount)[0])

    return {
        author: mostLikesAuthor,
        likes: authorLikeCount[mostLikesAuthor]
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}