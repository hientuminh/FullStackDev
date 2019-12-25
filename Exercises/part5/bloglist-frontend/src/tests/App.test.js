import React from 'react'
import { render,  waitForElement } from '@testing-library/react'

jest.mock('../services/blogs')
import App from '../App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getAllByText('login')
    )

    expect(component.container).toHaveTextContent(
      'log in to application'
    )
  })

  test('user logged', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))
    console.log(localStorage.getItem('loggedUser'))
    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Logout')
    )
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })
})
