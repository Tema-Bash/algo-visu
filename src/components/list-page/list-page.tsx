import React, { useEffect, useRef, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { LinkedList } from "./linkedList";
import { getCircleState } from "./utils";

const linkedList = new LinkedList<number>();

export const ListPage: React.FC = () => {
  const timer = useRef<NodeJS.Timeout>();
  const [inputValue, setInputValue] = useState<number>(0);
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [arrToRender, setArrToRender] = useState<number[]>([0, 34, 8, 1]);
  const [animationStatus, setAnimationStatus] = useState<number | null>(null);

  //инициализируем начальный массив
  useEffect(() => {
    for (let i in arrToRender) {
      linkedList.addToTail(arrToRender[i]);
    }
    setArrToRender(linkedList.toArrayOfValues());
  }, []);

  function addToHead(item: number) {
    linkedList.addToHead(item);
    AnimationAdd(0);
    setAnimationStatus(1);
  }

  function addToTail(item: number) {
    linkedList.addToTail(item);
    AnimationAdd(linkedList.toArrayOfValues().length - 1);
    setAnimationStatus(2);
  }

  function removeFromHead() {
    linkedList.removeFromHead();
    AnimatiOnDelete(0);
    setAnimationStatus(3);
  }

  function removeFromTail() {
    linkedList.removeFromTail();
    AnimatiOnDelete(linkedList.toArrayOfValues().length);
    setAnimationStatus(4);
  }

  function addByIndex(index: number, element: number) {
    linkedList.addByIndex(index, element);
    AnimationAdd(index);
    setAnimationStatus(5);
  }

  function removeByIndex(index: number) {
    linkedList.removeByIndex(index);
    AnimatiOnDelete(index);
    setAnimationStatus(6);
  }

  //Анимация добавления
  const [indexTopCircle, setIndexTopCircle] = useState<number | null>();
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState(0);
  const [indexesofChangingCircle, setIndexesofChangingCircle] = useState<
    number[][] | null
  >();
  const [greenIndex, setGreenIndex] = useState<number | null>();

  function AnimationAdd(index: number, method?: "add" | "delete") {
    setIndexTopCircle(0);

    let steps: number[][] = [[0]];
    for (let i = 1; i <= index; i++) {
      steps.push([...steps[i - 1], i]);
    }
    setIndexesofChangingCircle(steps);

    timer.current = setInterval(() => {
      if (steps.length > 0) {
        setCurrentAlgorithmStep((currentStep) => {
          setIndexTopCircle(currentStep + 1);
          const nextStep = currentStep + 1;
          if (nextStep > steps.length - 1 && timer.current) {
            clearInterval(timer.current);
            setArrToRender(linkedList.toArrayOfValues());
            setIndexesofChangingCircle(null);
            setCurrentAlgorithmStep(0);
            setIndexTopCircle(null);
            setGreenIndex(index);
            setTimeout(() => {
              setGreenIndex(null);
              setAnimationStatus(null);
            }, 1500);

            return currentStep;
          }
          return nextStep;
        });
      }
    }, 1000);
  }

  //Анимация удаления
  const [indexBottomCircle, setIndexBottomCircle] = useState<number | null>();
  const [valueBottomCircle, setValueBottomCircle] = useState<number>(0);

  function AnimatiOnDelete(index: number, method?: "add" | "delete") {
    let steps: number[][] = [[0]];
    for (let i = 1; i <= index; i++) {
      steps.push([...steps[i - 1], i]);
    }
    setIndexesofChangingCircle(steps);

    timer.current = setInterval(() => {
      if (steps.length > 0) {
        setCurrentAlgorithmStep((currentStep) => {
          const nextStep = currentStep + 1;
          if (nextStep > steps.length - 1 && timer.current) {
            let tmp = [...arrToRender];
            let bottomCircleValue = tmp.splice(index, 1, -1);
            tmp.splice(index, 1, -1);
            setValueBottomCircle(bottomCircleValue[0]);
            setArrToRender(tmp);
            setIndexBottomCircle(currentStep - 1);
            clearInterval(timer.current);
            setTimeout(() => {
              setIndexesofChangingCircle(null);
              setCurrentAlgorithmStep(0);
              setIndexBottomCircle(null);
              setArrToRender(linkedList.toArrayOfValues());
              setAnimationStatus(null);
            }, 1000);

            return currentStep;
          }
          return nextStep;
        });
      }
    }, 1000);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.elemsFunctions}>
          <Input
            placeholder={`Введите значение`}
            onInput={(e) =>
              setInputValue(Number((e.target as HTMLButtonElement).value))
            }
            isLimitText={true}
            maxLength={4}
            extraClass={styles.imputField}
          />
          <Button
            text={`Добавить в head`}
            onClick={() => addToHead(inputValue)}
            disabled={
              !inputValue || (animationStatus !== 1 && animationStatus !== null)
                ? true
                : false
            }
            isLoader={animationStatus === 1 ? true : false}
            extraClass={styles.button}
          />
          <Button
            text={`Добавить в tail`}
            onClick={() => addToTail(inputValue)}
            disabled={
              !inputValue || (animationStatus !== 2 && animationStatus !== null)
                ? true
                : false
            }
            isLoader={animationStatus === 2 ? true : false}
            extraClass={styles.button}
          />
          <Button
            text={`Удалить из head`}
            onClick={removeFromHead}
            disabled={
              linkedList.isEmpty() ||
              (animationStatus !== 3 && animationStatus !== null)
                ? true
                : false
            }
            isLoader={animationStatus === 3 ? true : false}
            extraClass={styles.button}
          />
          <Button
            text={`Удалить из tail`}
            onClick={removeFromTail}
            disabled={
              linkedList.isEmpty() ||
              (animationStatus !== 4 && animationStatus !== null)
                ? true
                : false
            }
            isLoader={animationStatus === 4 ? true : false}
            extraClass={styles.button}
          />
        </div>
        <div className={styles.indexFunctions}>
          <Input
            placeholder={`Введите индекс`}
            type={`number`}
            onInput={(e) =>
              setInputIndex(Number((e.target as HTMLButtonElement).value))
            }
            extraClass={styles.imputField}
          />
          <Button
            text={`Добавить по индексу`}
            onClick={() => addByIndex(inputIndex, inputValue)}
            disabled={
              !inputValue ||
              !inputIndex ||
              (animationStatus !== 5 && animationStatus !== null)
                ? true
                : false
            }
            extraClass={styles.button}
            isLoader={animationStatus === 5 ? true : false}
          />
          <Button
            text={`Удалить по индексу`}
            onClick={() => removeByIndex(inputIndex)}
            disabled={
              !inputValue ||
              !inputIndex ||
              (animationStatus !== 6 && animationStatus !== null)
                ? true
                : false
            }
            isLoader={animationStatus === 6 ? true : false}
            extraClass={styles.button}
          />
        </div>
      </div>
      <div className={styles.circlesContainer}>
        {arrToRender.map((el, i) => {
          return (
            <Circle
              key={i}
              head={
                i === indexTopCircle ? (
                  <Circle
                    letter={inputValue.toString()}
                    state={ElementStates.Changing}
                    isSmall
                  />
                ) : i === 0 ? (
                  "head"
                ) : null
              }
              tail={
                i - 1 === indexBottomCircle ? (
                  <Circle
                    letter={valueBottomCircle.toString()} //fix this
                    state={ElementStates.Changing}
                    isSmall
                  />
                ) : i === linkedList.toArrayOfValues().length - 1 ? (
                  "tail"
                ) : null
              }
              letter={el !== -1 ? el?.toString() : undefined}
              index={i}
              state={getCircleState(
                i,
                indexesofChangingCircle
                  ? indexesofChangingCircle[currentAlgorithmStep]
                  : [],
                greenIndex
              )}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
