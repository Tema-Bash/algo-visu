import React, { useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue";
import styles from "./queue-page.module.css";
import { getCircleState } from "./utils";

const queueSize = 10; //размер очереди
const queue = new Queue<number>(queueSize);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [instanceQueue, setInstanceQueue] = useState<(number | null)[]>([]);
  const [queueLength, setQueueLength] = useState(queue.getLength);
  const [head, setHead] = useState(0);
  const [tail, setTail] = useState(0);

  useEffect(() => {
    setInstanceQueue(queue.container.fill(-1)); //-1 == undefiend [-1,-1,-1,-1,-1,-1,-1,-1,-1]
  }, []);

  function enqueue() {
    if (queueLength >= queueSize) {
      throw new Error("Maximum length exceeded");
    }
    queue.enqueue(inputValue);
    let tmp = [...instanceQueue];
    tmp.splice(tail % queueSize, 1, inputValue);
    setInstanceQueue(tmp);
    setQueueLength((queueLength) => (queueLength = queueLength + 1));
    setTimeout(() => {
      setTail((tail) => (tail = (tail + 1) % queueSize));
    }, 1000);
  }

  function dequeue() {
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
          />
          <Button
            text={`Добавить`}
            onClick={enqueue}
            disabled={queueLength >= queueSize}
          />
          <Button
            text={`Удалить`}
            onClick={dequeue}
            disabled={queueLength === 0}
          />
        </div>
        <Button
          text={`Очистить`}
          onClick={clear}
          disabled={queueLength === 0}
        />
      </div>
      <div className={styles.circlesContainer}>
        {instanceQueue.map((el, i) => {
          return (
            <Circle
              key={i}
              head={i === head && el !== -1 ? `head` : null}
              tail={i === tail ? `tail` : null}
              letter={el !== -1 ? el?.toString() : undefined}
              index={i}
              state={getCircleState(i, el, tail, head)}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
