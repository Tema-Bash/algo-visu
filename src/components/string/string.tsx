import React, { useRef, useState } from 'react'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './string.module.css'
import { getCircleState, stringSort } from './utils'

export const StringComponent: React.FC = () => {
  const timer = useRef<NodeJS.Timeout>()
  const [animationStatus, setAnimationStatus] = useState(false)
  const [inputString, setInputString] = useState<string | null>()

  const [algorithmSteps, setAlgorithmSteps] = useState<string[][] | null>()
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState(0)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    let steps: string[][] = []
    steps = inputString ? stringSort(inputString) : [[]]
    console.log(steps)
    setAnimationStatus(true)
    setAlgorithmSteps(steps)
    setCurrentAlgorithmStep(0)

    timer.current = setInterval(() => {
      if (steps.length > 0) {
        setCurrentAlgorithmStep((currentStep) => {
          const nextStep = currentStep + 1
          if (nextStep === steps.length - 1) {
            setAnimationStatus(false)
          }
          if (nextStep > steps.length - 1 && timer.current) {
            clearInterval(timer.current)

            return currentStep
          }
          return nextStep
        })
      }
    }, 1000)
  }

  return (
    <SolutionLayout title='Строка'>
      <form className={styles.imputContainer} onSubmit={handleSubmit}>
        <Input
          type={'text'}
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
            )
          })}
      </div>
    </SolutionLayout>
  )
}

export default StringComponent
