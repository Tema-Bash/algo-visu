import { fireEvent, render } from '@testing-library/react'
import Button from './button.tsx'

describe('button tests', () => {
  it('button with text check', () => {
    const buttonString = 'num'
    const container = render(<Button text={buttonString} />)
    const buttonText = container.getByText(buttonString)
    expect(buttonText.textContent).toEqual(buttonString)
    expect(container).toMatchSnapshot()
  })

  it('button without text check', () => {
    const buttonString = ''
    const container = render(<Button text={buttonString} />)
    const buttonText = container.getByTestId('buttonText')
    expect(buttonText.textContent).toEqual('')
    expect(container).toMatchSnapshot()
  })

  it('button disabled check', () => {
    const buttonString = 'textButton'
    const mockHandler = jest.fn()
    const container = render(
      <Button text={buttonString} disabled={true} onClick={mockHandler} />
    )
    const button = container.getByTestId('button')
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(0)
    expect(button).toHaveProperty(`disabled`, true)
    expect(button).toBeDisabled()
    expect(container).toMatchSnapshot()
  })

  it('button loader check', () => {
    const buttonString = 'textButton'
    const mockHandler = jest.fn()
    const container = render(
      <Button text={buttonString} isLoader={true} onClick={mockHandler} />
    )
    const button = container.getByTestId('button')
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(0)

    const loaderImage = container.getByTestId('imgLoader')
    expect(loaderImage).toHaveProperty(`alt`, 'Загрузка.')
    expect(container).toMatchSnapshot()
  })
})
