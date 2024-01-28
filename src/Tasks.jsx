/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'
import uniqid from 'uniqid'

function Tasks(props) {
  const { hov } = props
  const id = uniqid()

  const [isEdit, setIsEdit] = useState({ id: id, state: false })

  const [isTask, setIsTask] = useState(false)
  const [task, setTask] = useState('')
  const [list, setList] = useState([])
  const [newTask, setNewTask] = useState('')
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

  console.log(list)
  return (
    <>
      <div className='max-w-md mx-auto'>
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
            />
          )
        })}
      </div>
    </>
  )
}

const Items = (props) => {
  const [isChecked, setIsChecked] = useState(false)

  const { id, task, remove, isEdit, edit, newTask, setIsEdit, setNewTask } =
    props
  return (
    <div key={id} className='max-w-md mx-auto flex justify-between my-4 '>
      <div className='flex justify-between items-center gap-2'>
        {isEdit.state === true && isEdit.id === id ? (
          <input
            type='text'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className='w-auto h-auto p-2 rounded-lg text-black'
          ></input>
        ) : (
          <>
            {' '}
            <input
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className='h-4 w-4'
              type='checkBox'
            />
            <h2>{task}</h2>
          </>
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
