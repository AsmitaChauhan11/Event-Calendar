const eventColors = {
  work: "bg-green-500",
  personal: "bg-yellow-500",
  other: "bg-red-500",
};

const EventCard = ({ event }) => (
  <div className={`p-2 rounded ${eventColors[event.type] || "bg-gray-200"}`}>
    {event.name}
  </div>
);

export default EventCard;
