import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import SimpleBlog from '../components/SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'HienTu',
    likes: 5
  }

  const onClick = () => {
    console.log('clicked');
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={onClick}/>
  )

  const divContent = component.container.querySelector('.info')
  console.log(prettyDOM(divContent))
  expect(divContent).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  const divLike = component.container.querySelector('.likes')
  console.log(prettyDOM(divLike))
  expect(divLike).toHaveTextContent(
    'blog has 5 likes'
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
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
