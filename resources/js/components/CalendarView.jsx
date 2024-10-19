import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './CalendarStyles.css'; // Custom styles (see below)

const activities = [
  { date: '2024-10-18', status: 'active' }, // Example activity: not due
  { date: '2024-10-20', status: 'due' },    // Example activity: due
  // Add more activities as needed
];

const getActivityStatus = (date) => {
  const dateString = date.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
  const activity = activities.find((activity) => activity.date === dateString);
  return activity ? activity.status : null;
};

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div   className="calendar-container">
      <h2>Activity Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date} 
        tileClassName={({ date }) => {
          const status = getActivityStatus(date);
          return status === 'active' ? 'tile-active' : status === 'due' ? 'tile-due' : null;
        }}
      />
    </div>
  );
};

export default CustomCalendar;
