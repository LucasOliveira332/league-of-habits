import { useEffect, useState } from 'react';
import HabitService from '../../services/HabitService';
import '../../assets/styles/HeatMap.css';
import Box from './box';

const MONTHDAYS = Array.from({ length: 35 }, (_, index) => index + 1);
const YEARMONTHS = Array.from({ length: 12 }, (_, index) => index);

export const RenderHeatMap = () => {
  const [completeDays, setCompleteDays] = useState(null);

  getCompleteDays(setCompleteDays)
  const dateFormatter = getDateFormatter();

  return (
    <>
      <div className="checkbox-months">
        {YEARMONTHS.map((month) => {
          return <MonthCheckBox monthNumber={month} dateList={completeDays} dateFormatter={dateFormatter} key={month} />;
        })}
      </div>
      <Box />
    </>
  );
};

function MonthCheckBox({ monthNumber, dateList, dateFormatter}: { monthNumber: number , dateList: Date[], dateFormatter: Intl.DateTimeFormat}) {
  const date = new Date(2024, monthNumber);
  const firstDayOfTheWeek = date.getDay();
  const finalDate = new Date(2024, monthNumber + 1, 0).getDate() + firstDayOfTheWeek;
  
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

function getDateFormatter(){
  const formatDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formatDate
}

function getCompleteDays(setCheckedDays : any){
  const habitService = new HabitService()

  useEffect(() => {
    const fetchData = async () => {
      setCheckedDays(await habitService.getCheckedDays());
    }
  fetchData();
  }, []);
}

function verifyIfDayIsChecked(timeInMilesseconds, dateList : Date[]) {
  const habitCount = 7
  const completeDaysCount = 7

  const pocentage = completeDaysCount * 1.0 / habitCount

  const boxStyle = {
    backgroundColor: '#161b22',
    width: '2px',
    padding: '5px',
    borderRadius: '2px'
  };

  if(dateList){
    const isCheckd = dateList.includes(timeInMilesseconds)
    if (isCheckd){
      boxStyle.backgroundColor = `rgba(57, 211, 83, ${pocentage})`;
      return boxStyle;
    }else{
      boxStyle.backgroundColor = '#161b22';
      return boxStyle;
    }
  } 

  return boxStyle
}