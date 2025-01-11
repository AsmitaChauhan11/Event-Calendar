import React, { useState } from "react";
import "./Calendar.css";
import { Button } from "../components/ui/button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import EventCard from "./EventCard";

const Calendar = ({ onDateClick, events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  const startDay = startOfMonth.getDay();
  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) =>
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  );

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const dayNames = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const paddedDays = [...Array((startDay + 6) % 7).fill(null), ...daysInMonth];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
          <FiChevronLeft size={18} />
          <span>Previous</span>
        </Button>
        <h2>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <Button variant="ghost" size="sm" onClick={handleNextMonth}>
          <span>Next</span>
          <FiChevronRight size={18} />
        </Button>
      </div>
      <div className="calendar-grid">
        {dayNames.map((day, index) => (
          <div key={index} className="calendar-day-name">
            {day}
          </div>
        ))}
        {paddedDays.map((day, index) => {
          const dayString = day ? day.toISOString().split("T")[0] : null;
          const dayEvents = events[dayString];
          const eventType = dayEvents?.[0]?.type;

          return (
            <div
              key={index}
              className={`calendar-day ${
                dayEvents ? `has-events ${eventType}` : ""
              }`}
              onClick={() => day && onDateClick(dayString)}
            >
              {day ? day.getDate() : ""}
              {dayEvents &&
                dayEvents.map((event, eventIndex) => (
                  <EventCard key={eventIndex} event={event} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
