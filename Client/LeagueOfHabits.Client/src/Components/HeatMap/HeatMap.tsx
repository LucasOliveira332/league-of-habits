import { useEffect, useState } from 'react';
import HabitService from '../../services/HabitService';
import '../../assets/styles/HeatMap.css';

const MONTHDAYS = Array.from({ length: 35 }, (_, index) => index + 1);
const YEARMONTHS = Array.from({ length: 12 }, (_, index) => index);

export const RenderHeatMap = () => {
  const [checkedDays, setCheckedDays] = useState(null);

  checkdDays(setCheckedDays)
  const formatter = dateFormatter();

  return (
    <>
      <div className="checkbox-months">
        {YEARMONTHS.map((month) => {
          return <MonthCheckBox monthNumber={month} dateList={checkedDays} dateFormatter={formatter} key={month} />;
        })}
      </div>
    </>
  );
};

function MonthCheckBox({ monthNumber, dateList, dateFormatter}: { monthNumber: number , dateList: Date[], dateFormatter: Intl.DateTimeFormat}) {
  const date = new Date(2024, monthNumber);
  const firstDayOfTheWeek = date.getDay();
  const finalDate = new Date(2024, monthNumber + 1, 0).getDate() + firstDayOfTheWeek;
  console.log(new Date(2024, monthNumber + 1, 0).getDate());
  console.log(firstDayOfTheWeek)
  return (
    <div className="month">
      {MONTHDAYS.map((_, index) => {
        if (index < firstDayOfTheWeek) {
          return <span key={index} className="box checkbox-hidden"></span>;
        } else if (index < finalDate) {
          const currentDate = new Date(2024, monthNumber, index + 1 - firstDayOfTheWeek)
          const formatDate = dateFormatter.format(currentDate);

          return (
            <span
              key={index}
              title={formatDate}
              style={
                verifyIfDayIsChecked(currentDate.getTime(), dateList)
              }
            ></span>
          );
        }
      })}
    </div>
  );
}

function dateFormatter(){
  const formatDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formatDate
}

function checkdDays(setCheckedDays : any){
  const habitService = new HabitService()

  useEffect(() => {
    const fetchData = async () => {
      setCheckedDays(await habitService.getCheckedDays());
    }
  fetchData();
  }, []);
}

function verifyIfDayIsChecked(timeInMilesseconds, dateList : Date[]) {
  const boxStyle = {
    backgroundColor: '#161b22',
    width: '2px',
    padding: '5px',
    borderRadius: '2px'
  };

  if(dateList){
    const isCheckd = dateList.includes(timeInMilesseconds)
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