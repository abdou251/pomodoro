/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

import { useHover } from './hoverContext'

const LongBreak = (props) => {
  const { hov, timer } = props
  const { hover } = useHover()
  const [minutes, setMinutes] = React.useState(15)
  const [seconds, setSeconds] = React.useState(0)
  const [isActive, setIsActive] = React.useState(false)

  React.useEffect(() => {
    let interval

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval)
            setIsActive(false)
            alert('Break over!')
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds])

  const startTimer = () => {
    setIsActive(true)
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
  }
  console.log(hov)

  return (
    <div className='flex flex-col items-center'>
      <div className={`${timer}`}>
        <span>{String(minutes).padStart(2, '0')}:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <div>
        <button className={`${hov}`} onClick={startTimer}>
          Start
        </button>
        <button className={`${hov}`} onClick={pauseTimer}>
          Pause
        </button>
        <button className={`${hov}`} onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default LongBreak
