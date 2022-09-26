import { ElementStates } from "../../types/element-states";

export function getCircleState(index: number, stackSize: number) {
  if (index + 1 > stackSize) {
    return ElementStates.Changing;
  } else {
    return ElementStates.Default;
  }
}
