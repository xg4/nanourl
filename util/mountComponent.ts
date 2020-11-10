import React from 'react'
import ReactDOM from 'react-dom'

export function mountComponent(
  Component: React.ReactElement,
  root = document.body
) {
  const div = document.createElement('div')
  root.appendChild(div)

  const onUnmount = () => {
    ReactDOM.unmountComponentAtNode(div)
    root.removeChild(div)
  }

  const Clone = React.cloneElement(Component, {
    onUnmount,
  })

  ReactDOM.render(Clone, div)

  return onUnmount
}
