'use client';

import React from 'react';
import { ToolbarProps } from 'react-big-calendar';

const CustomToolbar = (toolbar: ToolbarProps) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    const newDate = new Date(toolbar.date);
    newDate.setFullYear(year);
    toolbar.onNavigate('DATE', newDate);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(event.target.value, 10);
    const newDate = new Date(toolbar.date);
    newDate.setMonth(month);
    toolbar.onNavigate('DATE', newDate);
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push(i);
  }

  const months = [
    { value: 0, label: '1월' },
    { value: 1, label: '2월' },
    { value: 2, label: '3월' },
    { value: 3, label: '4월' },
    { value: 4, label: '5월' },
    { value: 5, label: '6월' },
    { value: 6, label: '7월' },
    { value: 7, label: '8월' },
    { value: 8, label: '9월' },
    { value: 9, label: '10월' },
    { value: 10, label: '11월' },
    { value: 11, label: '12월' },
  ];

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>이전</button>
        <button type="button" onClick={goToCurrent}>오늘</button>
        <button type="button" onClick={goToNext}>다음</button>
      </span>
      <span className="rbc-toolbar-label">
        <select onChange={handleYearChange} value={toolbar.date.getFullYear()}>
          {years.map(year => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>
        <select onChange={handleMonthChange} value={toolbar.date.getMonth()}>
          {months.map(month => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </span>
      <span className="rbc-btn-group">
        {toolbar.views.map(view => (
            <button
                key={view}
                type="button"
                className={toolbar.view === view ? 'rbc-active' : ''}
                onClick={() => toolbar.onView(view)}
            >
                {view === 'month' && '월'}
                {view === 'week' && '주'}
                {view === 'day' && '일'}
                {view === 'agenda' && '목록'}
            </button>
        ))}
      </span>
    </div>
  );
};

export default CustomToolbar;
