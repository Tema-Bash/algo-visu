import React, { useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue";
import styles from "./queue-page.module.css";
import { getCircleState } from "./utils";

const queueSize = 10;
const queue = new Queue<number>(queueSize);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [instanceQueue, setInstanceQueue] = useState<(number | null)[]>([]);
  const [queueLength, setQueueLength] = useState(queue.getLength);

  const [head, setHead] = useState(0);
  const [tail, setTail] = useState(0);

  const [animationStatus, setAnimationStatus] = useState<`add` | `delete` | null >(null);
    
  useEffect(() => {
    setInstanceQueue(queue.container.fill(-1));
  }, []);

  function enqueue() {
    setAnimationStatus('add')
    if (queueLength >= queueSize) {
      throw new Error("Maximum length exceeded");
    }
    queue.enqueue(inputValue);
    let tmp = [...instanceQueue];
    tmp.splice(tail % queueSize, 1, inputValue);

    setInstanceQueue(tmp);
    setTimeout(() => {
      setTail((tail) => (tail = (tail + 1) % queueSize));
      setQueueLength((queueLength) => (queueLength = queueLength + 1));
      setAnimationStatus(null);
    }, 1000);
  }

  function dequeue() {
    setAnimationStatus('delete')
    if (queue.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    queue.dequeue();
    let tmp = [...instanceQueue];
    tmp.splice(head % queueSize, 1, -1);
    setHead((head) => (head = (head + 1) % queueSize));
    setTimeout(() => {
      setInstanceQueue(tmp);
      setQueueLength((queueLength) => (queueLength = queueLength - 1));
      setAnimationStatus(null);
    }, 1000);
  }

  function clear() {
    queue.clear();
    setQueueLength(0);
    setHead(0);
    setTail(0);
    setInstanceQueue(queue.container.fill(-1));
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <Input
            placeholder={`Введите значение`}
            onInput={(e) =>
              setInputValue(Number((e.target as HTMLButtonElement).value))
            }
            isLimitText={true}
            maxLength={4}
            data-cy="input"
          />
          <Button
            text={`Добавить`}
            onClick={enqueue}
            isLoader={animationStatus === `add`}
            disabled={queueLength >= queueSize|| !inputValue}
            data-cy="button-enqueue"
          />
          <Button
            text={`Удалить`}
            onClick={dequeue}
            isLoader={animationStatus === `delete`}
            disabled={queueLength === 0}
            data-cy="button-dequeue"
          />
        </div>
        <Button
          text={`Очистить`}
          onClick={clear}
          disabled={queueLength === 0}
          data-cy="clear"
        />
      </div>
      <div className={styles.circlesContainer} data-cy={'circle-container'}>
        {instanceQueue.map((el, i) => {
          return (
            <Circle
              key={i}
              head={i === head && el !== -1 ? `head` : null}
              tail={i === tail ? `tail` : null}
              letter={el !== -1 ? el?.toString() : undefined}
              index={i}
              state={getCircleState(i, el, head, tail)}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
