import { Link } from "react-router-dom";

function EventCard({ event, bookedSeats, isSelected, onSelect }) {
  const remaining = Math.max(event.capacity - bookedSeats, 0);

  return (
    <article className={`event-card ${isSelected ? "event-card-selected" : ""}`}>
      <p className="chip">{event.category}</p>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <ul>
        <li>{event.venue}</li>
        <li>{new Date(event.date).toLocaleDateString()} at {event.time}</li>
        <li>BDT {event.price} per ticket</li>
        <li>{remaining} seats left</li>
      </ul>
      <div className="event-actions">
        <button type="button" className="primary-btn" onClick={() => onSelect(event.id)}>
          {isSelected ? "Selected" : "Book Now"}
        </button>
        <Link className="secondary-btn text-link-btn" to={`/events/${event.id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
