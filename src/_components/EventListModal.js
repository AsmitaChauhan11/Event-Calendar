import React, { useState } from "react";
import EventForm from "./EventForm";
import "./EventListModal.css";
import EventCard from "./EventCard";
import { Button } from "../components/ui/button";

const EventListModal = ({
  date,
  events,
  onSaveEvent,
  onDeleteEvent,
  onClose,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="event-modal">
      <h2>Events for {date}</h2>

      <Button variant="ghost" size="sm" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Event"}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSearch(!showSearch)}
      >
        {showSearch ? "Close Search" : "Search Events"}
      </Button>

      {showSearch && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Search Events"
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
          />
        </div>
      )}

      {showForm && <EventForm onSave={(event) => onSaveEvent(event)} />}

      <ul>
        {filteredEvents.map((event, index) => (
          <li key={index}>
            <EventCard event={event} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteEvent(index)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <Button variant="ghost" size="sm" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};

export default EventListModal;
