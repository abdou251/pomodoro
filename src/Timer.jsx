/* eslint-disable react/prop-types */
import React from 'react'

export default function Timer(props) {
  const { hov, timer, est } = props

  const [minutes, setMinutes] = React.useState(est * 25)
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
            alert('Pomodoro session completed! Take a break.')
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
