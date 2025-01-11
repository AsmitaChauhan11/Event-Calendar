import React, { useState } from "react";
import "./EventForm.css";
import { Button } from "../components/ui/button";

const EventForm = ({ onSave }) => {
  const [event, setEvent] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
    type: "work", // Default event type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(event);
    setEvent({
      name: "",
      startTime: "",
      endTime: "",
      description: "",
      type: "work",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={event.name}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="startTime"
        value={event.startTime}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="endTime"
        value={event.endTime}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={event.description}
        onChange={handleChange}
      />
      <select name="type" value={event.type} onChange={handleChange}>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>
      <Button variant="ghost" size="sm" type="submit">
        Save Event
      </Button>
    </form>
  );
};

export default EventForm;
