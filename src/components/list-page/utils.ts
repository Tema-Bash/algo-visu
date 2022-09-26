import { ElementStates } from "../../types/element-states";

export function getCircleState(
  index: number,
  currentStep: number[],
  greenIndex?: number | null
) {
  if (currentStep.includes(index)) {
    return ElementStates.Changing;
  }
  if (index === greenIndex) {
    return ElementStates.Modified;
  } else {
    return ElementStates.Default;
  }
}
