// import { useState } from 'react'
import './App.css'

const RenderCheckBox = () => {

  const week = Array.from({length: 35}, (_,index) => index + 1)
  //TODO - continue daqui
  const months = Array
  const date = new Date(2024, 1, 0)
  const inicialDate = date.getDay() + 1
  const finalDate = new Date(2024, 2, 0).getDate() + inicialDate

  return (
    <>
    <div className='checkbox-months'>
      <div>
        {week.map((_, index) => { 
          
          console.log(index < finalDate)
          if(index < inicialDate){
            return (<><input title={'formatDate'} className={'checkbox-hidden'} type="checkbox"/>{(index + 1) % 7 == 0 ? (<br></br>) : ' '}</>)
          }
          else if(index < finalDate){
              return (<><input title={'formatDate'} className='checkbox' type="checkbox"/>{(index + 1) % 7 == 0 ? (<br></br>) : ' '}</>)
          }

        })}
      </div>
    </div>
    </>
  )
}

function App() {

  return (
    <>
      <RenderCheckBox/>
    </>
  )
}

export default App
