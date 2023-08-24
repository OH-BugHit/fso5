/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Show/Hide blog info', () => {

  test('renders title but not url or likes', () => {
    const blog = {
      title: 'Testiotsikko',
      author: 'Olli',
      likes: 5,
      url: 'www.rrr.eee'
    }

    render(<Blog blog={blog} />)

    const title = screen.getByText(
      'Testiotsikko', { exact: false })
    expect(title).toBeDefined()
  })

  test('renders additional info when \'view\' pressed', async () => {
    const blog = {
      title: 'Testiotsikko',
      author: 'Olli',
      likes: 5,
      url: 'www.rrr.eee',
      user: { name: 'mockName' }
    }

    const mockHandler = jest.fn()
    const mockUser = {
      username: 'mockName'
    }

    render(<Blog blog={blog} handleButton={mockHandler} user={mockUser} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const title = screen.getByText(
      'Testiotsikko', { exact: false })
    expect(title).toBeDefined()
    const author = screen.getByText(
      'Olli', { exact: false }
    )
    expect(author).toBeDefined()
    const url = screen.getByText(
      'www.rrr.eee', { exact: false }
    )
    expect(url).toBeDefined()
    const likes = screen.getByText(
      '5', { exact: false }
    )
    expect(likes).toBeDefined()
    const userName = screen.getByText(
      'mockName', { exact: false }
    )
    expect(userName).toBeDefined()
  })
})