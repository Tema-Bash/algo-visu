import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Step } from "./types";

export function getRandomArray(): number[] {
  let minLength = 3;
  let maxLength = 17;
  let randomArr = [];
  for (
    let i = 0;
    i < Math.abs(Math.random() * (maxLength - minLength + 1) + minLength);
    i++
  ) {
    randomArr.push(Math.floor(Math.random() * 100));
  }
  return randomArr;
}

export function getSelectSortSteps(
  sourceArray: number[],
  direction: Direction = Direction.Ascending
): Step[] {
  const steps: Step[] = [];
  const { length } = sourceArray;

  if (direction === Direction.Ascending) {
    for (let i = 0; i < length - 1; i++) {
      let minInd = i;
      for (let j = i; j < length; j++) {
        if (sourceArray[minInd] > sourceArray[j]) {
          minInd = j;
        }

        steps.push({
          currentArray: [...sourceArray],
          sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || []), i],
          aIndex: i,
          bIndex: j,
        });
      }

      [sourceArray[minInd], sourceArray[i]] = [
        sourceArray[i],
        sourceArray[minInd],
      ];
    }
  } else {
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i; j < length; j++) {
        if (sourceArray[maxInd] < sourceArray[j]) {
          maxInd = j;
        }

        steps.push({
          currentArray: [...sourceArray],
          sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || []), i],
          aIndex: i,
          bIndex: j,
        });
      }

      [sourceArray[maxInd], sourceArray[i]] = [
        sourceArray[i],
        sourceArray[maxInd],
      ];
    }
  }

  steps.push({
    currentArray: [...sourceArray],
    sortedIndexes: steps[steps.length - 1]?.sortedIndexes || [],
  });
  return steps;
}

export function getBubbleSortSteps(
  sourceArray: number[],
  direction: Direction = Direction.Ascending
): Step[] {
  const steps: Step[] = [];
  let iterationNumber = 0;

  const { length } = sourceArray;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - iterationNumber; j++) {
      if (direction === Direction.Ascending) {
        if (sourceArray[j] > sourceArray[j + 1]) {
          let tmp = sourceArray[j];
          sourceArray[j] = sourceArray[j + 1];
          sourceArray[j + 1] = tmp;
        }
      } else {
        if (sourceArray[j] < sourceArray[j + 1]) {
          let tmp = sourceArray[j];
          sourceArray[j] = sourceArray[j + 1];
          sourceArray[j + 1] = tmp;
        }
      }

      steps.push({
        currentArray: [...sourceArray],
        sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || [])],
        aIndex: j,
        bIndex: j + 1,
      });
    }
    ++iterationNumber;
    steps[steps.length - 1].sortedIndexes.push(
      sourceArray.length - iterationNumber
    );
  }

  steps.push({
    currentArray: [...sourceArray],
    sortedIndexes: steps[steps.length - 1]?.sortedIndexes || [],
  });

  return steps;
}

export function getColumnState(
  index: number,
  maxIndex: number,
  currentStepNumber: number,
  currentStep: Step
): ElementStates {
  if ([currentStep.aIndex, currentStep.bIndex].includes(index)) {
    return ElementStates.Changing;
  }
  if (
    currentStep.sortedIndexes.includes(index) ||
    (currentStepNumber === maxIndex && maxIndex > 0)
  ) {
    return ElementStates.Modified;
  }

  return ElementStates.Default;
}
