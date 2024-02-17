import { useEffect, useState } from 'react';
import HabitRepository from '../../repositories/HabitRepository';
import './HeatMap.css';
function MonthCheckBox({ monthNumber }: { monthNumber: number }) {
  const [checkedDays, setCheckedDays] = useState(null);

  const formatDatePtBr = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const habitRepository = new HabitRepository()
  useEffect(() => {
    const fetchData = async () => {
      setCheckedDays(await habitRepository.getCheckedDays());
    }
  fetchData();
  }, []);

  const verifyIfDayIsChecked =  (timeInMilesseconds) => {
    if(checkedDays){
      const isCheckd = checkedDays.includes(timeInMilesseconds)
      return isCheckd ? 'box isCheck' : 'box'
    } 
    return 'box'
  }



  const week = Array.from({ length: 35 }, (_, index) => index + 1);
  const date = new Date(2024, monthNumber);

  // console.log(date)

  const firstDayOfTheWeek = date.getDay();
  const finalDate =
    new Date(2024, monthNumber + 1, 0).getDate() + firstDayOfTheWeek;

  return (
    <div className="month">
      {week.map((_, index) => {
        if (index < firstDayOfTheWeek) {
          return <span key={index} className="box checkbox-hidden"></span>;
        } else if (index < finalDate) {
          const formatDate = formatDatePtBr.format(date.setDate(index));
          return (
            <span
              key={index}
              title={formatDate}
              className={
                verifyIfDayIsChecked(date.getTime())
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
