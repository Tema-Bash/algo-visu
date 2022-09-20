import React, { useRef, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { getCircleState, swap } from "./utils";

export const StringComponent: React.FC = () => {
  const timer = useRef<NodeJS.Timeout>();
  const [animationStatus, setAnimationStatus] = useState(false);
  const [inputString, setInputString] = useState<string | null>();

  const [algorithmSteps, setAlgorithmSteps] = useState<string[][] | null>();
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState(0);

  function stringSort(string: string) {
    let StringTemp = [string.split("")];
    for (let i = 0; i < string.length / 2; i++) {
      let temp = StringTemp[i].slice();
      swap(temp, i, temp.length - 1 - i);
      StringTemp.push(temp);
    }
    StringTemp.unshift(StringTemp[0]);
    return StringTemp;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let steps: string[][] = [];
    steps = inputString ? stringSort(inputString) : [[]];
    setAnimationStatus(true);
    setAlgorithmSteps(steps);
    setCurrentAlgorithmStep(0);

    timer.current = setInterval(() => {
      if (steps.length > 0) {
        setCurrentAlgorithmStep((currentStep) => {
          const nextStep = currentStep + 1;
          if (nextStep === steps.length - 1) {
            setAnimationStatus(false);
          }
          if (nextStep > steps.length - 1 && timer.current) {
            clearInterval(timer.current);

            return currentStep;
          }
          return nextStep;
        });
      }
    }, 1000);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.imputContainer} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          onInput={(e) => setInputString((e.target as HTMLButtonElement).value)}
          placeholder={`Введите текст`}
          isLimitText={true}
          maxLength={11}
          extraClass={styles.inputFild}
        />
        <Button
          text={`Развернуть`}
          type={`submit`}
          disabled={!inputString}
          isLoader={animationStatus}
        />
      </form>
      <div className={styles.circlesContainer}>
        {algorithmSteps &&
          algorithmSteps[currentAlgorithmStep]?.map((el, index) => {
            return (
              <Circle
                key={index}
                letter={el}
                state={getCircleState(
                  index,
                  currentAlgorithmStep - 1,
                  inputString!.length,
                  animationStatus
                )}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
