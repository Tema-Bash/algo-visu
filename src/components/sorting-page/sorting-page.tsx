import React, { useRef, useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { SortKind, Step } from "./types";
import {
  getBubbleSortSteps,
  getColumnState,
  getRandomArray,
  getSelectSortSteps,
} from "./utils";

export const SortingPage: React.FC = () => {
  const [sortDirection, setSortDirection] = useState<Direction>();
  const [currentSortAlgorithmKind, setCurrentSortAlgorithmKind] =
    useState<SortKind>(SortKind.Select);
  const randomArray = useRef<number[]>(getRandomArray());
  const [algorithmSteps, setAlgorithmSteps] = useState<Step[]>([
    {
      currentArray: randomArray.current,
      sortedIndexes: [],
    },
  ]);
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState(0);
  const isAlgorithmInProcess = currentAlgorithmStep < algorithmSteps.length - 1;
  const timer = useRef<NodeJS.Timeout>();
  const [animationStatus, setAnimationStatus] = useState(false);

  const generateNewArray = () => {
    setCurrentAlgorithmStep(0);
    randomArray.current = getRandomArray();
    setAlgorithmSteps([
      {
        currentArray: randomArray.current,
        sortedIndexes: [],
      },
    ]);
  };

  const makeSort = (currentSortDirection: Direction) => {
    setSortDirection(currentSortDirection);
    let steps = [];
    setAnimationStatus(true);
    if (currentSortAlgorithmKind === `bubble`) {
      steps = getBubbleSortSteps(randomArray.current, currentSortDirection);
    } else {
      steps = getSelectSortSteps(randomArray.current, currentSortDirection);
    }

    setAlgorithmSteps(steps);
    setCurrentAlgorithmStep(0);

    timer.current = setInterval(() => {
      if (steps.length > 0) {
        setCurrentAlgorithmStep((currentStep) => {
          const nextStep = currentStep + 1;
          if (nextStep > steps.length - 1 && timer.current) {
            clearInterval(timer.current);
            setAnimationStatus(false);
            return currentStep;
          }
          return nextStep;
        });
      }
    }, 500);
  };

  return (
    <SolutionLayout title="???????????????????? ??????????????">
      <div className={styles.container}>
        <div className={styles.radioContainer}>
          <RadioInput
            label={`??????????`}
            checked={currentSortAlgorithmKind === SortKind.Select}
            onChange={() => setCurrentSortAlgorithmKind(SortKind.Select)}
            disabled={isAlgorithmInProcess}
          />
          <RadioInput
            label={`??????????????`}
            checked={currentSortAlgorithmKind === SortKind.bubble}
            onChange={() => setCurrentSortAlgorithmKind(SortKind.bubble)}
            disabled={isAlgorithmInProcess}
          />
        </div>

        <Button
          type={`button`}
          text={`???? ??????????????????????`}
          sorting={Direction.Ascending}
          onClick={() => makeSort(Direction.Ascending)}
          disabled={
            sortDirection !== Direction.Ascending && isAlgorithmInProcess
          }
          isLoader={sortDirection === Direction.Ascending && animationStatus}
        />
        <Button
          type={`button`}
          text={`???? ????????????????`}
          sorting={Direction.Descending}
          onClick={() => makeSort(Direction.Descending)}
          disabled={
            sortDirection !== Direction.Descending && isAlgorithmInProcess
          }
          isLoader={sortDirection === Direction.Descending && animationStatus}
        />
        <Button
          type={`button`}
          text={`?????????? ????????????`}
          onClick={() => generateNewArray()}
          disabled={isAlgorithmInProcess}
        />
      </div>
      <div className={styles.columnsContainer}>
        {algorithmSteps.length > 0 &&
          algorithmSteps[currentAlgorithmStep]?.currentArray.map(
            (currentNumber, index) => (
              <Column
                key={index}
                index={currentNumber}
                extraClass={styles.column}
                state={getColumnState(
                  index,
                  algorithmSteps.length - 1,
                  currentAlgorithmStep,
                  algorithmSteps[currentAlgorithmStep]
                )}
              />
            )
          )}
      </div>
    </SolutionLayout>
  );
};
