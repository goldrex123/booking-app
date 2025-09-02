'use client';

import { Calendar, dateFnsLocalizer, Event, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';
import React, { useState } from 'react';

// Setup the localizer by providing the functions we want to use.
const locales = {
  'ko': ko,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Booking {
  id: number;
  resource_name: string;
  start_time: string;
  end_time: string;
}

interface BookingCalendarProps {
  bookings: Booking[];
}

const BookingCalendar = ({ bookings }: BookingCalendarProps) => {
  // State to manage the current date and view of the calendar
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>('month'); // Default view is 'month'

  // Transform booking data into the format required by react-big-calendar
  const events: Event[] = bookings.map(booking => ({
    title: booking.resource_name,
    start: new Date(booking.start_time),
    end: new Date(booking.end_time),
    resource: booking.id, // Attach original booking id
  }));

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        culture="ko"
        messages={{
            next: "다음",
            previous: "이전",
            today: "오늘",
            month: "월",
            week: "주",
            day: "일",
            agenda: "목록",
            date: "날짜",
            time: "시간",
            event: "이벤트",
            noEventsInRange: "이 범위에 이벤트가 없습니다.",
            showMore: total => `+${total} 더 보기`
        }}
        toolbar={true}
        // Add these props to make the calendar interactive
        date={date}
        view={view}
        onNavigate={newDate => setDate(newDate)}
        onView={newView => setView(newView)}
      />
    </div>
  );
};

export default BookingCalendar;
