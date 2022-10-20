import { fireEvent, render } from '@testing-library/react'
import Circle from './circle.tsx'
import { ElementStates } from '../../../types/element-states'

describe('circle tests', () => {
  it('without letter', () => {
    const container = render(<Circle />)
    const circleLetter = container.getByTestId('letter')
    expect(circleLetter.textContent).toEqual('')
  })

  it('with letter', () => {
    const expectedLetter = 'a'
    const container = render(<Circle letter={expectedLetter} />)
    const circleLetter = container.getByTestId('letter')
    expect(circleLetter.textContent).toEqual(expectedLetter)
    expect(container).toMatchSnapshot()
  })

  it('with head', () => {
    const expectedLetter = 'a'
    const container = render(<Circle head={expectedLetter} />)
    const circleHead = container.getByTestId('head')
    expect(circleHead.textContent).toEqual(expectedLetter)
    expect(container).toMatchSnapshot()
  })

  it('with react element in head', () => {
    const testLetter = 'a'
    const container = render(<Circle head={<Circle letter={testLetter} />} />)
    const circleHead = container.getByText(testLetter)
    expect(circleHead.textContent).toEqual(testLetter)
    expect(container).toMatchSnapshot()
  })

  it('with tail', () => {
    const expectedLetter = 'b'
    const container = render(<Circle tail={expectedLetter} />)
    const circleTail = container.getByTestId('tail')
    expect(circleTail.textContent).toEqual(expectedLetter)
    expect(container).toMatchSnapshot()
  })

  it('with react element in tail', () => {
    const testLetter = 'b'
    const container = render(<Circle tail={<Circle letter={testLetter} />} />)
    const circleTail = container.getByText(testLetter)
    expect(circleTail.textContent).toEqual(testLetter)
    expect(container).toMatchSnapshot()
  })

  it('with index', () => {
    const expectedIndex = '5'
    const container = render(<Circle index={expectedIndex} />)
    const circleIndex = container.getByTestId('index')
    expect(circleIndex.textContent).toEqual(expectedIndex)
    expect(container).toMatchSnapshot()
  })

  it('with prop isSmall', () => {
    const container = render(<Circle isSmall={true} />)
    const smallDiv = container.getByTestId('middleDiv')
    expect(smallDiv).toHaveClass('small')
  })

  it('with state equal default', () => {
    const container = render(<Circle state={ElementStates.Default} />)
    const middleDiv = container.getByTestId('middleDiv')
    expect(middleDiv).toHaveClass('default')
  })

  it('with state equal Changing', () => {
    const container = render(<Circle state={ElementStates.Changing} />)
    const middleDiv = container.getByTestId('middleDiv')
    expect(middleDiv).toHaveClass('changing')
  })

  it('with state equal Modified', () => {
    const container = render(<Circle state={ElementStates.Modified} />)
    const middleDiv = container.getByTestId('middleDiv')
    expect(middleDiv).toHaveClass('modified')
  })
})
