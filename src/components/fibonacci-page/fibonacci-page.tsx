import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentArr, setCurrentArr] = useState<number[]>([0, 1]);
  const [visibleArr, setVisibleArr] = useState<number[]>([0]);
  const [maxCount, setMaxCount] = useState(19);
  const [animationStatus, setAnimationStatus] = useState(false);
  let count = 0;

  const handleSubmit = (event: any) => {
    count = 0;
    setCurrentArr([0, 1]);
    setVisibleArr([0]);
    setAnimationStatus(true);
    event.preventDefault();
    setVisible(true);
    setMaxCount(event.target[0].value);
    fibbonacciArrCreate(event.target[0].value);
  };

  function fibbonacciArrCreate(number: number) {
    let temp = [0, 1];
    for (let i = 0; i < number - 1; i++) {
      temp.push(temp[i] + temp[i + 1]);
      setCurrentArr(temp);
    }
  }

  function updateArr() {
    count++;
    setVisibleArr((visibleArr) => [...visibleArr, currentArr[count]]);
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (visible) {
        updateArr();
      }
      if (count >= maxCount) {
        setAnimationStatus(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [visible, currentArr]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.imputContainer} onSubmit={handleSubmit}>
        <Input
          placeholder={`Введите текст`}
          type={`number`}
          min={1}
          max={19}
          isLimitText={true}
          extraClass={styles.inputFild}
        />
        <Button
          text={`Развернуть`}
          type={`submit`}
          isLoader={animationStatus}
        />
      </form>
      <div className={styles.circlesContainer}>
        {visible &&
          visibleArr?.map((el, i) => {
            return (
              <Circle
                key={i}
                letter={el?.toString()}
                index={i}
                state={ElementStates.Default}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
