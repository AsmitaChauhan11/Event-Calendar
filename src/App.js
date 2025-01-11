import React, { useState } from "react";
import Calendar from "./_components/Calendar";
import EventListModal from "./_components/EventListModal";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || {}
  );

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleSaveEvent = (date, newEvent) => {
    const updatedEvents = { ...events };
    if (!updatedEvents[date]) updatedEvents[date] = [];
    updatedEvents[date].push(newEvent);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleDeleteEvent = (date, index) => {
    const updatedEvents = { ...events };
    updatedEvents[date].splice(index, 1);
    if (updatedEvents[date].length === 0) delete updatedEvents[date];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="App">
      <h1>Event Calendar</h1>
      <Calendar onDateClick={handleDateClick} events={events} />
      {selectedDate && (
        <EventListModal
          date={selectedDate}
          events={events[selectedDate] || []}
          onSaveEvent={(event) => handleSaveEvent(selectedDate, event)}
          onDeleteEvent={(index) => handleDeleteEvent(selectedDate, index)}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}

export default App;
