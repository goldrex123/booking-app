'use client';

import { Calendar, dateFnsLocalizer, Event, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';
import React, { useState } from 'react';
import BookingModal from './BookingModal';
import CustomToolbar from './CustomToolbar';

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
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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
        components={{
          toolbar: CustomToolbar,
        }}
        // Add these props to make the calendar interactive
        date={date}
        view={view}
        onNavigate={newDate => setDate(newDate)}
        onView={newView => setView(newView)}
        onSelectEvent={event => {
          const booking = bookings.find(b => b.id === event.resource);
          if (booking) {
            setSelectedBooking(booking);
          }
        }}
      />
      {selectedBooking && (
        <BookingModal
          show={!!selectedBooking}
          onHide={() => setSelectedBooking(null)}
          booking={selectedBooking}
          mode="details"
        />
      )}
    </div>
  );
};

export default BookingCalendar;
