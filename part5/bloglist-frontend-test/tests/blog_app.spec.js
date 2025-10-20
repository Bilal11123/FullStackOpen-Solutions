const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
        data: {
            name: 'Root',
            username: 'root',
            password: 'sekret'
        }
        })
        await request.post('http://localhost:3003/api/users', {
        data: {
            name: 'Root2',
            username: 'root2',
            password: 'sekret2'
        }
        })

        await page.goto('http://localhost:5173')
    })
    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('Log in to application')
        await expect(locator).toBeVisible()
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByLabel('username').fill('root')
            await page.getByLabel('password').fill('sekret')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Root logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByLabel('username').fill('root')
            await page.getByLabel('password').fill('sekret39')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Wrong username or password')).toBeVisible()
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByLabel('username').fill('root')
            await page.getByLabel('password').fill('sekret')
            await page.getByRole('button', { name: 'login' }).click()
        })
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Create New Blog' }).click()
            await page.getByLabel('title').fill('Testing Playwrite')
            await page.getByLabel('author').fill('play-write')
            await page.getByLabel('url').fill('https://playwrite.com')
            await page.getByRole('button', { name: 'create' }).click()
            await expect(page.getByText('Testing Playwrite play-write')).toBeVisible()
        })
        describe('A blog is made', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'Create New Blog' }).click()
                await page.getByLabel('title').fill('Testing Playwrite Blog')
                await page.getByLabel('author').fill('play-write')
                await page.getByLabel('url').fill('https://playwrite.com')
                await page.getByRole('button', { name: 'create' }).click()
            })
            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('likes 1')).toBeVisible()
            })
            test('a blog can be deleted', async ({ page }) => {
                page.on('dialog', async dialog => {
                    await dialog.accept(); // choose "OK"
                });
                await page.getByRole('button', { name: 'view' }).click()
                await page.getByRole('button', { name: 'remove' }).click()
                await expect(page.getByText('Testing Playwrite Blog play-write')).not.toBeVisible()
            })
            test('only the user who added the blog sees the blogs delete button', async ({ page }) => {
                await page.getByRole('button', { name: 'Logout' }).click()
                await page.getByLabel('username').fill('root2')
                await page.getByLabel('password').fill('sekret2')
                await page.getByRole('button', { name: 'login' }).click()
                await page.getByRole('button', { name: 'view' }).click()
                await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
            })
            describe('Multiple blogs are made', () => {
                test('blogs are arranged in the order according to the likes', async ({ page }) => {
                    await page.getByLabel('title').fill('Second Blog')
                    await page.getByLabel('author').fill('play-Write')
                    await page.getByLabel('url').fill('https://playwrite.org')
                    await page.getByRole('button', { name: 'create' }).click()
                    await expect(page.getByText('Second Blog play-Write')).toBeVisible()

                    await page.getByLabel('title').fill('Another Blog')
                    await page.getByLabel('author').fill('playWrite')
                    await page.getByLabel('url').fill('https://playwrite.org')
                    await page.getByRole('button', { name: 'create' }).click()
                    await expect(page.getByText('Another Blog playWrite')).toBeVisible()

                    await page.getByRole('button', { name: 'view' }).last().click()
                    await page.getByRole('button', { name: 'like' }).click()
                    await page.getByRole('button', { name: 'like' }).click()
                     // Capture the order again after liking
                    const afterOrder = await page.locator('.blog').allInnerTexts()

                    // Expect that the blog which was last is now first
                    expect(afterOrder[0]).toContain('Another Blog')
                })

            })
        })
    })
})

