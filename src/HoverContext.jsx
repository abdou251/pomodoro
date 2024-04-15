import { createContext, useContext, useState } from 'react'

const HoverContext = createContext(undefined)
// eslint-disable-next-line react/prop-types
export const HoverProvider = ({ children }) => {
  const [hover] = useState({
    pomoHover:
      'hover:bg-red-500 hover:text-white rounded-lg px-4 mx-4 py-2 bg-white text-red-400 font-bold',
    shortHover:
      'hover:bg-blue-400 hover:text-white rounded-lg px-4 mx-4 py-2 bg-white text-blue-400 font-bold',
    longHover:
      'hover:bg-green-400 hover:text-white rounded-lg px-4 mx-4 py-2 bg-white text-green-400 font-bold',
  })

  return (
    <HoverContext.Provider value={{ hover }}>{children}</HoverContext.Provider>
  )
}

export const useHover = () => useContext(HoverContext)
