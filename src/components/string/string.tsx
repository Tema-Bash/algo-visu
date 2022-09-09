import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [currentString, setCurrentString] = useState<string[]>([]);
  const [sortingString, setSortingString] = useState<string[][]>([]);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  const swap = (
    arr: string[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setCount(0);
    stringSort(event.target[0].value);
  };

  function stringSort(string: string) {
    let StringTemp = [string.split("")];
    for (let i = 0; i < string.length / 2; i++) {
      let temp = StringTemp[i].slice();
      swap(temp, i, temp.length - 1 - i);
      StringTemp.push(temp);
    }

    setSortingString(StringTemp);
  }

  useEffect(() => {
    setCurrentString(sortingString[0]);
    console.log(`sortingString[][] change`);
  }, [sortingString]);

  useEffect(() => {
    console.log(`count is change`);
  }, [count]);

  useEffect(() => {
    console.log(`currentString[] change`);
    if (currentString?.length !== 0) {
      setCount(count + 1);
      setVisible(true);
      setTimeout(() => {
        console.log(`timeout 1s`);
        setCurrentString(sortingString[count]);
        console.log(`setCurrentString(sortingString[${count}]) `);
      }, 1000);
    }
  }, [currentString]);

  function circleState(i: number): ElementStates {
    //console.log(`i is ${i}`);
    //console.log(`count is ${count}`);
    if (i < count) {
      return ElementStates.Modified;
    } else if ((i = count)) {
      return ElementStates.Changing;
    } else {
      return ElementStates.Default;
    }
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.imputContainer} onSubmit={handleSubmit}>
        <Input placeholder={`Введите текст`} extraClass={styles.inputFild} />
        <Button text={`Развернуть`} type={`submit`} />
      </form>
      <div className={styles.circlesContainer}>
        {visible &&
          currentString?.map((el, i) => {
            return <Circle key={i} letter={el} state={circleState(i)} />;
          })}
      </div>
    </SolutionLayout>
  );
};
