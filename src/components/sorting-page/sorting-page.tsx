import React, { useEffect, useRef, useState } from "react";
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
    let steps = [];
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

            return currentStep;
          }
          return nextStep;
        });
      }
    }, 500);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <div className={styles.radioContainer}>
          <RadioInput
            label={`Выбор`}
            checked={currentSortAlgorithmKind === SortKind.Select}
            onChange={() => setCurrentSortAlgorithmKind(SortKind.Select)}
            disabled={isAlgorithmInProcess}
          />
          <RadioInput
            label={`Пузырёк`}
            checked={currentSortAlgorithmKind === SortKind.bubble}
            onChange={() => setCurrentSortAlgorithmKind(SortKind.bubble)}
            disabled={isAlgorithmInProcess}
          />
        </div>

        <Button
          type={`button`}
          text={`По возрастанию`}
          sorting={Direction.Ascending}
          onClick={() => makeSort(Direction.Ascending)}
          disabled={
            sortDirection !== Direction.Ascending && isAlgorithmInProcess
          }
          isLoader={
            sortDirection === Direction.Ascending && isAlgorithmInProcess
          }
        />
        <Button
          type={`button`}
          text={`По убыванию`}
          sorting={Direction.Descending}
          onClick={() => makeSort(Direction.Descending)}
          disabled={
            sortDirection !== Direction.Descending && isAlgorithmInProcess
          }
          isLoader={
            sortDirection === Direction.Descending && isAlgorithmInProcess
          }
        />
        <Button
          type={`button`}
          text={`Новый массив`}
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

/*
  const [columns, setColumns] = useState<any[]>();
  const [method, setMethod] = useState<string>("selection");
  const [sorting, setSorting] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("up"); //up-по возрастанию down-по убыванию
  let count = 0;

  //меняет элементы массива по индексу
  const swap = (
    arr: string[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  //генерирует массив псевдо СВ прим [79, 90, 74, 4, 55, 40, 35, 98, 55, 93, 70, 36]
  function randomArr(): number[] {
    let minLength = 3;
    let maxLength = 17;
    let randomArr = [];
    for (
      let i = 0;
      i < Math.abs(Math.random() * (maxLength - minLength) + minLength);
      i++
    ) {
      randomArr.push(Math.floor(Math.random() * 100));
    }
    return randomArr;
  }

  //заполняем массив высот
  const handleClickGenerate = () => {
    console.log(`handleClickGenerate`);
    setColumns(randomArr());
  };

  //меняем чекбокс и стейт
  const checkboxHandler = () => {
    method === "selection" ? setMethod("bubble") : setMethod("selection");
  };
  /*
  function selectionSortArr() {
    console.log(`selection tick`);
    console.log(columns); //[79, 90, 74, 4, 55, 40, 35, 98, 55, 93, 70, 36]

    //setColumns((columns)=>[] //ставим на позицию максимальный элемент)
  }

  function buubleSortArr() {
    console.log(`buuble tick`);
    //setVisibleArr((visibleArr) => [...visibleArr, currentArr[count]]);
  }

  React.useEffect(() => {
    console.log(`React.useEffect sorting, columns`);
    const interval = setInterval(() => {
      if (sorting && method === "buble") {
        buubleSortArr();
      }
      if (sorting && method === "selection") {
        selectionSortArr();
      }
    }, 1000);

    return () => {
      console.log(`clearInterval`);
      clearInterval(interval); //очищаем интервал после выхода со странички
    };
  }, [sorting, columns]);

*/
