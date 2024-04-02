import { useEffect, useState } from 'react';
import ModelDayInfo from '../ModelDayInfo/ModelDayInfo';

const x = {
	"habits": ["Corrida", "Estudo", "Academia"],
	"Total": 2,
	"ExpectedTotal": 7
}

const Box = () => {
  const [completeDays, setCompleteDays] = useState(x)

  return (
    <>
      <ModelDayInfo />
      <span style={setPorcentage(completeDays.ExpectedTotal, completeDays.Total)}>Hello world</span>
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