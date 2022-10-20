import { ElementStates } from '../../types/element-states'

export function swap(
  arr: string[],
  firstIndex: number,
  secondIndex: number
): void {
  const temp = arr[firstIndex]
  arr[firstIndex] = arr[secondIndex]
  arr[secondIndex] = temp
}

export function stringSort(string: string) {
  let StringTemp = [string.split('')]
  for (let i = 0; i < string.length / 2; i++) {
    let temp = StringTemp[i].slice()
    swap(temp, i, temp.length - 1 - i)
    StringTemp.push(temp)
  }
  StringTemp.unshift(StringTemp[0])
  return StringTemp
}

export function getCircleState(
  index: number,
  currentAlgorithmStep: number,
  length: number,
  animationStatus: boolean
): ElementStates {
  let a = currentAlgorithmStep
  let b = length - currentAlgorithmStep - 1

  if (!animationStatus) {
    return ElementStates.Modified
  }

  if (index === a || index === b) {
    return ElementStates.Changing
  }
  if (index < a || index > b) {
    return ElementStates.Modified
  }

  return ElementStates.Default
}
