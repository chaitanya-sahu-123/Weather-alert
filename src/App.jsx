import { useState } from 'react'
import React from 'react'
import Weather from './Components/Weather';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Weather/>
    </div>
  )
}

export default App;
