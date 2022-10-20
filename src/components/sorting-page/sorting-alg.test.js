import { getSelectSortSteps, getBubbleSortSteps } from './utils'

const CURRENT_ARRAY = [3, 8, 5, 9];

describe('select sorting tests', () => {
  it('select sorting empty array is correct', () => {
    expect(getSelectSortSteps([])).toStrictEqual([
      { currentArray: [], sortedIndexes: [] }
    ])
  })

  it('select sorting array with one number is correct', () => {
    expect(getSelectSortSteps([5])).toStrictEqual([
      { currentArray: [5], sortedIndexes: [] }
    ])
  })

  it('select sorting array is correct', () => {
    expect(getSelectSortSteps([3, 8, 5, 9])).toStrictEqual([
      {
        currentArray: [3, 8, 5, 9],
        sortedIndexes: [0],
        aIndex: 0,
        bIndex: 0
      },
      {
        currentArray: [3, 8, 5, 9],
        sortedIndexes: [0, 0],
        aIndex: 0,
        bIndex: 1
      },
      {
        currentArray: [3, 8, 5, 9],
        sortedIndexes: [0, 0, 0],
        aIndex: 0,
        bIndex: 2
      },
      {
        currentArray: [3, 8, 5, 9],
        sortedIndexes: [0, 0, 0, 0],
        aIndex: 0,
        bIndex: 3
      },
      {
        currentArray: [3, 8, 5, 9],
        sortedIndexes: [0, 0, 0, 0, 1],
        aIndex: 1,
        bIndex: 1
      },
      {
        currentArray: [3, 8, 5, 9],
        sortedIndexes: [0, 0, 0, 0, 1, 1],
        aIndex: 1,
        bIndex: 2
      },
      {
        currentArray: [3, 8, 5, 9],
        sortedIndexes: [0, 0, 0, 0, 1, 1, 1],
        aIndex: 1,
        bIndex: 3
      },
      {
        currentArray: [3, 5, 8, 9],
        sortedIndexes: [0, 0, 0, 0, 1, 1, 1, 2],
        aIndex: 2,
        bIndex: 2
      },
      {
        currentArray: [3, 5, 8, 9],
        sortedIndexes: [0, 0, 0, 0, 1, 1, 1, 2, 2],
        aIndex: 2,
        bIndex: 3
      },
      {
        currentArray: [3, 5, 8, 9],
        sortedIndexes: [0, 0, 0, 0, 1, 1, 1, 2, 2]
      }
    ])
  })
})

describe('bubble sorting tests', () => {
  it('bubble sorting empty array is correct', () => {
    expect(getBubbleSortSteps([])).toStrictEqual([
      { currentArray: [], sortedIndexes: [] }
    ])
  })

  it('bubble sorting array with one number is correct', () => {
    expect(getBubbleSortSteps([5])).toStrictEqual([
      { currentArray: [5], sortedIndexes: [] }
    ])
  })

  it('bubble sorting array is correct', () => {
    expect(getBubbleSortSteps([3, 8, 5, 9])).toStrictEqual([
      {
        currentArray: [3, 8, 5, 9],
        sortedIndexes: [],
        aIndex: 0,
        bIndex: 1
      },
      {
        currentArray: [3, 5, 8, 9],
        sortedIndexes: [],
        aIndex: 1,
        bIndex: 2
      },
      {
        currentArray: [3, 5, 8, 9],
        sortedIndexes: [3],
        aIndex: 2,
        bIndex: 3
      },
      {
        currentArray: [3, 5, 8, 9],
        sortedIndexes: [3],
        aIndex: 0,
        bIndex: 1
      },
      {
        currentArray: [3, 5, 8, 9],
        sortedIndexes: [3, 2],
        aIndex: 1,
        bIndex: 2
      },
      {
        currentArray: [3, 5, 8, 9],
        sortedIndexes: [3, 2, 1],
        aIndex: 0,
        bIndex: 1
      },
      { currentArray: [3, 5, 8, 9], sortedIndexes: [3, 2, 1] }
    ])
  })
})
