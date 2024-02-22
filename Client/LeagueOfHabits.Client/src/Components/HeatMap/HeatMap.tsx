import { useEffect, useState } from 'react';
import HabitService from '../../services/HabitService';
import './HeatMap.css';

function MonthCheckBox({ monthNumber }: { monthNumber: number }) {
  const [checkedDays, setCheckedDays] = useState(null);
  const formatDatePtBr = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const habitService = new HabitService()

  useEffect(() => {
    const fetchData = async () => {
      setCheckedDays(await habitService.getCheckedDays());
    }
  fetchData();
  }, []);

  const verifyIfDayIsChecked =  (timeInMilesseconds) => {
    const boxStyle = {
      backgroundColor: '#161b22',
      width: '2px',
      padding: '5px',
      borderRadius: '2px'
    };

    if(checkedDays){
      const isCheckd = checkedDays.includes(timeInMilesseconds)
      if (isCheckd){
        boxStyle.backgroundColor = `rgba(57, 211, 83, ${0.5 + 0.5})`;
        return boxStyle;
      }else{
        boxStyle.backgroundColor = '#161b22';
        return boxStyle;
      }
    } 

    return boxStyle
  }

  const week = Array.from({ length: 35 }, (_, index) => index + 1);
  const date = new Date(2024, monthNumber);

  const firstDayOfTheWeek = date.getDay();
  const finalDate =
    new Date(2024, monthNumber + 1, 0).getDate() + firstDayOfTheWeek;

  return (
    <div className="month">
      {week.map((_, index) => {
        if (index < firstDayOfTheWeek) {
          return <span key={index} className="box checkbox-hidden"></span>;
        } else if (index < finalDate) {
          const currentDate = new Date(2024, monthNumber, index + 1 - firstDayOfTheWeek)
          const formatDate = formatDatePtBr.format(currentDate);

          return (
            <span
              key={index}
              title={formatDate}
              style={
                verifyIfDayIsChecked(currentDate.getTime())
              }
            ></span>
          );
        }
      })}
    </div>
  );
}

export const RenderHeatMap = () => {
  const months = Array.from({ length: 12 }, (_, index) => index);

  return (
    <>
      <div className="checkbox-months">
        {months.map((month) => {
          return <MonthCheckBox monthNumber={month} key={month} />;
        })}
      </div>
    </>
  );
};
