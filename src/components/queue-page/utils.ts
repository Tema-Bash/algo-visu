import { isEditable } from "@testing-library/user-event/dist/utils";
import { ElementStates } from "../../types/element-states";

export function getCircleState(
  index: number,
  el: number | null,
  tail: number,
  head: number
) {
  if (index == head - 1 && el !== -1) {
    return ElementStates.Changing;
  }
  if (index == tail && el !== -1) {
    return ElementStates.Changing;
  } else {
    return ElementStates.Default;
  }
}
