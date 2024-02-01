import './HeatMap.css';
function MonthCheckBox({ monthNumber }: { monthNumber: number }) {
  const formatDatePtBr = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const week = Array.from({ length: 35 }, (_, index) => index + 1);
  const date = new Date(2024, monthNumber);
  const firstDayOfTheWeek = date.getDay();
  const finalDate =
    new Date(2024, monthNumber + 1, 0).getDate() + firstDayOfTheWeek;

  return (
    <>
      <div className="month">
        {week.map((_, index) => {
          if (index < firstDayOfTheWeek) {
            return (
              <>
                <span className="box checkbox-hidden"></span>
                {(index + 1) % 7 == 0 ? <br></br> : ' '}
              </>
            );
          } else if (index < finalDate) {
            const formatDate = formatDatePtBr.format(date);
            return (
              <>
                <span title={formatDate} className="box"></span>
              </>
            );
          }
        })}
      </div>
    </>
  );
}

export const RenderHeatMap = () => {
  const months = Array.from({ length: 12 }, (_, index) => index);

  return (
    <>
      <div className="checkbox-months">
        {months.map((month) => {
          return <MonthCheckBox monthNumber={month} />;
        })}
      </div>
    </>
  );
};
