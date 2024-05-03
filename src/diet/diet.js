import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const nextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const prevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const selectDate = (date) => {
    setSelectedDate(date);
  };

  // 요일 이름 배열
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const renderDates = () => {
    const week = [];
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek.setDate(startOfWeek.getDate() + (i === 0 ? 0 : 1)));
      week.push(
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '30px',
          margin: '0 10px',
          cursor: 'pointer'
        }} onClick={() => selectDate(date)}>
            <div style={{ marginBottom: '4px' }}>
                {weekDays[date.getDay()]}
            </div> {/* 요일을 표시 */}
            <div style={{
                lineHeight: '30px',
                borderRadius: '50%',
                backgroundColor: selectedDate && selectedDate.toDateString() === date.toDateString() ? 'black' : 'transparent',
                color: selectedDate && selectedDate.toDateString() === date.toDateString() ? 'white' : 'black',
                width: '30px',
                height: '30px',
                textAlign: 'center'
            }}>
                {date.getDate()}
            </div>
        </div>
      );
    }
    return week;
  };

  const Test = () => {
    const date = new Date();
    const dateString = date.toDateString();

    return dateString;
  }

  return (
    <div>
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <button onClick={prevWeek}>{"<"}</button>
        {Test()}
        <button onClick={nextWeek}>{">"}</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{renderDates()}</div>
    </div>
  );
};

export default Calendar;