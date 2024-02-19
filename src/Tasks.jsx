/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './App.css'
import uniqid from 'uniqid'

function Tasks(props) {
  const { hov, est, setEst, taskBg } = props
  const id = uniqid()

  const [isEdit, setIsEdit] = useState({ id: id, state: false })

  const [task, setTask] = useState('')

  const [newTask, setNewTask] = useState('')

  const [list, setList] = useState(() => {
    try {
      const storedList = JSON.parse(localStorage.getItem('taskList'))
      return storedList || []
    } catch (error) {
      console.error('Error retrieving tasks from local storage:', error)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(list))
  }, [list])

  const handleClick = (e) => {
    e.preventDefault()
    if (task) {
      setList([...list, { id, task }])
      setTask('')
    }
  }
  const edit = (id) => {
    // Create a new array with the updated item
    const updatedList = list.map((item) =>
      item.id === id && newTask ? { ...item, task: newTask } : item
    )

    // Update the state with the new array
    setList(updatedList)
    setIsEdit({ id: id, state: false })
    setNewTask('')
  }
  const remove = (id) => {
    setList((list) => list.filter((item) => item.id !== id))
    console.log(list)
  }

  return (
    <>
      <div className='w-md'>
        <form className='my-16' onSubmit={handleClick}>
          <label
            htmlFor='task'
            className='block text-gray-700 font-medium mb-2'
          ></label>

          <input
            className='border border-gray-400 p-2 w-full rounded-md px-4 mb-6'
            type='text'
            value={task}
            name='task'
            onChange={(e) => setTask(e.target.value)}
          />
          <button className={hov}>Submit</button>
        </form>
      </div>
      {list.map((item) => {
        return (
          <Items
            key={item.id}
            {...item}
            remove={remove}
            setTask={setTask}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            edit={edit}
            newTask={newTask}
            setNewTask={setNewTask}
            est={est}
            setEst={setEst}
            taskBg={taskBg}
          />
        )
      })}
    </>
  )
}

const Items = (props) => {
  const [isChecked, setIsChecked] = useState(false)

  const {
    id,
    task,
    remove,
    isEdit,
    edit,
    newTask,
    setIsEdit,
    setNewTask,
    taskBg,
  } = props

  return (
    <div
      key={id}
      className={`${taskBg} rounded-2xl flex justify-between items-center my-4 w-1/2 p-4 `}
    >
      <div className='flex flex-col justify-between items-center gap-2'>
        {isEdit.state === true && isEdit.id === id ? (
          <div className='flex flex-col justify-between items-center gap-2'>
            <input
              type='text'
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className='w-auto h-auto p-2 rounded-lg text-black'
            ></input>
          </div>
        ) : (
          <div className='flex items-center'>
            {' '}
            <input
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className='h-4 w-5 mr-1'
              type='checkBox'
            />
            <h2 className='text-white font-medium text-xl'>{task}</h2>
          </div>
        )}
      </div>
      <div className='flex gap-1'>
        {isEdit.state === true && isEdit.id === id ? (
          <>
            {' '}
            <button
              className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md'
              onClick={() => edit(id)}
            >
              save
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md'
              onClick={() => setIsEdit({ id: id, state: false })}
            >
              cancel
            </button>
          </>
        ) : (
          <>
            {' '}
            <button
              className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md'
              onClick={() => setIsEdit({ id: id, state: true })}
            >
              edit
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md'
              onClick={() => remove(id)}
            >
              remove
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Tasks
