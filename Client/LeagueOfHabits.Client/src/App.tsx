// import { useState } from 'react'
import './App.css'

const CheckBox = ({numberOfCheckBox}: {numberOfCheckBox : number[]}) => {
  return (
    <>
      {numberOfCheckBox.map((number) => (<input type="checkbox" />))}
    </>
  )
}

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <CheckBox numberOfCheckBox={[1,2,3,4]}/>
    </>
  )
}

export default App
