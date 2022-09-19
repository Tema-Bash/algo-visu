import { ElementStates } from "../../types/element-states";

export function swap(
  arr: string[],
  firstIndex: number,
  secondIndex: number
): void {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

export function getCircleState(
  index: number,
  currentAlgorithmStep: number,
  length: number,
  animationStatus: boolean
): ElementStates {
  let a = currentAlgorithmStep;
  let b = length - currentAlgorithmStep - 1;

  if (!animationStatus) {
    return ElementStates.Modified;
  }

  if (index === a || index === b) {
    return ElementStates.Changing;
  }
  if (index < a || index > b) {
    return ElementStates.Modified;
  }

  return ElementStates.Default;
}
