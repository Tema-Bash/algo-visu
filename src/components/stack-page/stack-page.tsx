import React, { useState } from "react";

import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Stack from "./stack";
import styles from "./stack-page.module.css";
import { getCircleState } from "./utils";

const stack = new Stack<number>();

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [instanceStack, setInstanceStack] = useState<number[]>([]);
  const [stackSize, setStackSize] = useState(stack.getSize);
  const [animationStatus, setAnimationStatus] = useState<
    `onPush` | `onPop` | null
  >(null);

  function pushItem() {
    setAnimationStatus(`onPush`);
    stack.push(inputValue);
    setInstanceStack([...instanceStack, inputValue]);
    setTimeout(() => {
      setStackSize(stack.getSize);
      setAnimationStatus(null);
    }, 1000);
  }

  function popItem() {
    setAnimationStatus(`onPop`);
    let tmp = [...instanceStack];
    tmp.pop();
    stack.pop();
    setStackSize(stack.getSize);
    setTimeout(() => {
      setInstanceStack(tmp);
      setAnimationStatus(null);
    }, 1000);
  }

  function clearStack() {
    stack.clearContainer();
    setInstanceStack([]);
    setStackSize(0);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <Input
            placeholder={`Введите значение`}
            onInput={(e) =>
              setInputValue(Number((e.target as HTMLButtonElement).value))
            }
            isLimitText={true}
            maxLength={4}
            extraClass={styles.inputFild}
            data-cy="input"
          />
          <Button
            text={`Добавить`}
            onClick={pushItem}
            disabled={stackSize >= 12 || animationStatus === `onPop`|| !inputValue}
            isLoader={animationStatus === `onPush`}
            data-cy="button-add"
          />
          <Button
            text={`Удалить`}
            onClick={popItem}
            disabled={stackSize === 0 || animationStatus === `onPush`}
            isLoader={animationStatus === `onPop`}
            data-cy="button-pop"
          />
        </div>
        <Button
          text={`Очистить`}
          onClick={clearStack}
          disabled={stackSize === 0 || !!animationStatus}
          data-cy="button-clear"
        />
      </div>
      <div className={styles.circlesContainer}>
        {instanceStack.length > 0 &&
          instanceStack.map((el, i) => {
            return (
              <Circle
                key={i}
                head={i === stackSize - 1 ? `top` : null}
                letter={el?.toString()}
                index={i}
                state={getCircleState(i, stackSize)}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
