// import { useState } from 'react'
import './App.css'

const days = new Date(2024, 1 + 1, 0).getDate()



const CheckBox = ({habitName}: {habitName: string}) => {
  const week = Array.from({length: 35}, (_,index) => index + 1)
  let count = 0;
  let date = new Date(2024, 0, count)
  let day = date.getDay()


  return (
    <>
      <div className='habit-check-box'>
      <h4 className='habit-name'>{habitName}</h4>
      {week.map((value, index) => { 

        if (day != 1){
          count += 1
          date = new Date(2024, 0, count)
          day = date.getDay()
          return (<><input title={date} className={'checkbox-hidden'} type="checkbox"/>{(index + 1) % 7 == 0 ? (<br></br>) : ' '}</>)
        }
        else if (day > 0){
          return (<><input title={date} type="checkbox"/>{(index + 1) % 7 == 0 ? (<br></br>) : ' '}</>)
        }
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
