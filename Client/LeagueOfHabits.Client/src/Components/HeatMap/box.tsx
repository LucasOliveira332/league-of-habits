import { useEffect, useState } from 'react';

const completeDay = {
  "dayOfWeek": 0,
	"habits": ["Corrida", "Estudo", "Academia"],
	"ExpectedTotal": 7,
	"Total": 0
}

const Box = () => {
  [completeDays, setCompleteDays] = useState(completeDay)
  return (
    <>
      <span style={setPorcentage(7 , 4)}>Hello world</span>
    </>
  )
}

function setPorcentage(habitCount: number, completeDaysCount: number){

  const pocentage = completeDaysCount * 1.0 / habitCount

  const boxStyle = {
    backgroundColor: '#161b22',
    width: '2px',
    padding: '5px',
    borderRadius: '2px'
  };

  boxStyle.backgroundColor = `rgba(57, 211, 83, ${pocentage})`;

  return boxStyle
}

export default Box;