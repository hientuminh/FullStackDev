import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import Blog from '../components/Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'HienTu',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} handleLikeBlog={() => console.log('like')} handleDeleteBlog={() => console.log('delete')}/>
  )

  const divContent = component.container.querySelector('.info')
  expect(divContent).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'HienTu',
    likes: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} handleLikeBlog={() => console.log('like')} handleDeleteBlog={() => console.log('delete')}/>
  )

  const divContent = document.querySelector('.blog')
  expect(divContent).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  const clickOnText = getByText('HienTu')
  fireEvent.click(clickOnText)
  const divContentDetails = document.querySelector('.details')
  expect(divContentDetails).toHaveTextContent(
    '5 likes'
  )
})
