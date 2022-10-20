import { stringSort } from './utils'

describe('string tests', () => {
  test('even', () => {
    const evenPhrase = 'abcdef'
    expect(stringSort(evenPhrase)).toStrictEqual([
      ['a', 'b', 'c', 'd', 'e', 'f'],
      ['a', 'b', 'c', 'd', 'e', 'f'],
      ['f', 'b', 'c', 'd', 'e', 'a'],
      ['f', 'e', 'c', 'd', 'b', 'a'],
      ['f', 'e', 'd', 'c', 'b', 'a']
    ])
  })

  test('odd', () => {
    const oddPhrase = 'abcde'
    expect(stringSort(oddPhrase)).toStrictEqual([
      ['a', 'b', 'c', 'd', 'e'],
      ['a', 'b', 'c', 'd', 'e'],
      ['e', 'b', 'c', 'd', 'a'],
      ['e', 'd', 'c', 'b', 'a'],
      ['e', 'd', 'c', 'b', 'a']
    ])
  })

  test('one symbol', () => {
    const testPhrase = 'a'
    expect(stringSort(testPhrase)).toStrictEqual([['a'], ['a'], ['a']])
  })

  test('empty string', () => {
    const testPhrase = ''
    expect(stringSort(testPhrase)).toStrictEqual([[], []])
  })
})
