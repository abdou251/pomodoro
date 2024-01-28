import Home from './Home'

import { HoverProvider } from './hoverContext'

function App() {
  return (
    <HoverProvider>
      <Home />
    </HoverProvider>
  )
}

export default App
