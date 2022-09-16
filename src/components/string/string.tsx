import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [visibleString, setVisibleString] = useState<string[]>([]);
  const [currentString, setCurrentString] = useState<string[][]>([]);
  const [visible, setVisible] = useState(false);
  let count = 0;
  const [count2, setCount2] = useState(0);
  const [maxCount, setMaxCount] = useState(11);

  const swap = (
    arr: string[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  //функция-слушатель "сабмит-а"
  const handleSubmit = (event: any) => {
    event.preventDefault();
    count = 0;
    setCount2(0);
    setCurrentString([]);
    setVisibleString([]);
    setVisible(true);
    setMaxCount(event.target[0].value.length);
    stringSort(event.target[0].value);
  };

  //функция генерит матрицу для вывода
  function stringSort(string: string) {
    let StringTemp = [string.split("")];
    for (let i = 0; i < string.length / 2; i++) {
      let temp = StringTemp[i].slice();
      swap(temp, i, temp.length - 1 - i);
      StringTemp.push(temp);
    }

    setCurrentString(StringTemp); // [[a b c d],[d b c a],[d c b a]]
  }

  function circleState(i: number): ElementStates {
    //вычисляем состояние кружка по номеру
    console.log(`i is ${i}`);
    console.log(`count2 is ${count2}`);

    if (count2 === i || count2 == maxCount - 1 - i) {
      console.log(`Changing`);
      return ElementStates.Changing;
    } else if (count2 > i || count2 > maxCount - 1 - i) {
      console.log(`Modified`);
      return ElementStates.Modified;
    } else if (count2 < i || count2 < maxCount - 1 - i) {
      console.log(`Default`);
      return ElementStates.Default;
    } else {
      console.log(`oh no ifs ends`);
      return ElementStates.Default;
    }
  }

  //зацикленная функция
  function updateString() {
    console.log(`count is ${count}`);
    //console.log(`visibleString[] change`);
    //console.log(`visiblestring now ${currentString[count]}`);
    setVisibleString(currentString[count]);
    count++;
  }

  React.useEffect(() => {
    console.log(`setInterval`);

    const interval = setInterval(() => {
      if (count >= maxCount - 1) {
        console.log(`deleteInterval count >= maxCount`);
        clearInterval(interval);
      }
      if (visible === true) {
        //setCount2((count2) => count2 + 1);

        updateString();
      }
    }, 2000);

    return () => {
      console.log(`deleteInterval после выхода со странички`);
      clearInterval(interval); //очищаем интервал после выхода со странички
    };
  }, [visible, currentString]);

  return (
    <SolutionLayout title="Строка">
      <form className={styles.imputContainer} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={`Введите текст`}
          isLimitText={true}
          maxLength={11}
          extraClass={styles.inputFild}
        />
        <Button text={`Развернуть`} type={`submit`} />
      </form>
      <div className={styles.circlesContainer}>
        {visible &&
          visibleString?.map((el, i) => {
            return <Circle key={i} letter={el} state={circleState(i)} />;
          })}
      </div>
    </SolutionLayout>
  );
};
