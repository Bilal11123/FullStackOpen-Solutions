import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('default display only title and author', () => {
    const blog = {
        title: 'example title',
        author: 'example author',
        url: 'https://www.example.com',
        likes: 0,
        user: { name: 'someone' } // since component accesses blog.user.name
    }

    render(<Blog blog={blog} addLikes={() => {}} removeBlog={() => {}} userName="" />)

    // Title + Author are on the same line, so we check combined text
    const titleAuthor = screen.getByText(/example title.*example author/i)
    expect(titleAuthor).toBeDefined()

    // URL should NOT be visible initially
    const url = screen.queryByText('https://www.example.com')
    expect(url).toBeNull()

    // likes should NOT be visible initially
    const likes = screen.queryByText(/likes/i)
    expect(likes).toBeNull()

})

test('display url and likes after view button click', async () => {
    const blog = {
        title: 'example title',
        author: 'example author',
        url: 'https://www.example.com',
        likes: 0,
        user: { name: 'someone' } // since component accesses blog.user.name
    }

    render(<Blog blog={blog} addLikes={() => {}} removeBlog={() => {}} userName="" />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    // Title + Author are on the same line, so we check combined text
    const titleAuthor = screen.getByText(/example title.*example author/i)
    expect(titleAuthor).toBeDefined()

    // Now URL should be visible
    expect(screen.getByText('https://www.example.com')).toBeDefined()

    // Likes should be visible
    expect(screen.getByText(/likes 0/i)).toBeDefined()
})

test('clicking like twice calls event handler twice', async () => {
    const blog = {
        title: 'example title',
        author: 'example author',
        url: 'https://www.example.com',
        likes: 5,
        user: { name: 'someone' }
    }

    // Create a mock function for addLikes
    const mockAddLikes = vi.fn()      // If using Vitest
    // const mockAddLikes = jest.fn() // If using Jest

    render(<Blog blog={blog} addLikes={mockAddLikes} removeBlog={() => {}} userName="" />)

    const user = userEvent.setup()

    // First show the like button by clicking "view"
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // Now click the like button twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    // Ensure the mock handler was called twice
    expect(mockAddLikes).toHaveBeenCalledTimes(2)
})
