// import { useState } from 'react'
import './App.css'

const days = new Date(2024, 1 + 1, 0).getDate()



const CheckBox = ({habitName}: {habitName: string}) => {
  const week = Array.from({length: days}, (_,index) => index + 1)
  return (
    <>
      <div className='habit-check-box'>
      <h4 className='habit-name'>{habitName}</h4>
      {week.map((value, index) => { 
          const date = new Date(2024, 0, index + 1)
          const formatDate = Intl.DateTimeFormat('pt-BR').format(date)

          return (<><input title={formatDate} className='habit-check' type="checkbox"/>{(index + 1) % 7 == 0 ? (<br></br>) : ' '}</>)
        })}
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
