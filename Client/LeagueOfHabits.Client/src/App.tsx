// import { useState } from 'react'
import './App.css'


const CheckBox = ({habitName}: {habitName: string}) => {
  const week = Array.from({length: 365}, (_,index) => index + 1)
  return (
    <>
      <div className='habit-check-box'>
      <h4 className='habit-name'>{habitName}</h4>
      {week.map(() => (<input className='habit-check' type="checkbox" />))}
      </div> 
    </>
  )
}

function App() {


  return (
    <>
      <CheckBox habitName = {'Study'}/>
    </>
  )
}

export default App
