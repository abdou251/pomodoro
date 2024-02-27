import './App.css'
import Timer from './Timer'
import ShortBreak from './ShortBreak'
import LongBreak from './LongBreak'
import React from 'react'
import { useHover } from './hoverContext'
import Tasks from './Tasks'

function Home() {
  const { hover } = useHover()

  const [pomodoro, setPomodoro] = React.useState(true)
  const [shortBreak, setShortBreak] = React.useState(false)
  const [longBreak, setLongBreak] = React.useState(false)
  const [hov, setHov] = React.useState(hover.pomoHover)
  const [taskBg, setTaskBg] = React.useState('bg-red-200')

  const podo = () => {
    setPomodoro(true)
    setShortBreak(false)
    setLongBreak(false)
    setHov(hover.pomoHover)

    setTaskBg('bg-red-300')
  }
  const longB = () => {
    setPomodoro(false)
    setShortBreak(false)
    setLongBreak(true)
    setHov(hover.longHover)

    setTaskBg('bg-green-200')
  }
  const shortB = () => {
    setPomodoro(false)
    setShortBreak(true)
    setLongBreak(false)
    setHov(hover.shortHover)
    setTaskBg('bg-blue-200')
  }

  const menu = (
    <div className='phone:flex tablet:flex-row tablet:gap-1 justify-center phone:flex-col gap-3 '>
      <button className={`${hov}`} onClick={podo}>
        Pomodoro
      </button>
      <button className={`${hov}`} onClick={shortB}>
        Short Break
      </button>
      <button className={`${hov}`} onClick={longB}>
        Long Break
      </button>
    </div>
  )
  const bg = 'w-screen h-100 py-16 flex flex-col justify-start items-center '
  const timer =
    'block lg:mx-48 sm:mx-11 my-8 py-2 font-extrabold text-white text-7xl'

  /*...........................................*/
  if (pomodoro) {
    return (
      <div className='h-screen bg-red-300 '>
        {' '}
        <div className={`${bg} bg-red-300 `}>
          <div className='bg-red-200 rounded-xl py-8 '>
            {menu}
            <Timer hov={hov} timer={timer} />
          </div>
          <Tasks hov={hov} taskBg={taskBg} />
        </div>
      </div>
    )
  } else if (shortBreak) {
    return (
      <div className='h-screen bg-blue-300 '>
        {' '}
        <div className={`${bg} bg-blue-300`}>
          <div className='bg-blue-200 rounded-xl py-8'>
            {menu}
            <ShortBreak hov={hov} timer={timer} />
          </div>
          <Tasks hov={hov} taskBg={taskBg} />
        </div>
      </div>
    )
  } else if (longBreak) {
    return (
      <div className='h-screen bg-green-300 '>
        {' '}
        <div className={`${bg} bg-green-300`}>
          <div className='bg-green-200 rounded-xl py-8'>
            {menu}
            <LongBreak hov={hov} timer={timer} />
          </div>
          <Tasks hov={hov} taskBg={taskBg} />
        </div>
      </div>
    )
  }
}

export default Home
