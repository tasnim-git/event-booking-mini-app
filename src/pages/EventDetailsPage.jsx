import { Link, useParams } from "react-router-dom";

function EventDetailsPage({ events, bookedByEvent, onSelect }) {
  const { eventId } = useParams();
  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return (
      <main className="app-shell">
        <section className="panel details-panel">
          <h2>Event not found</h2>
          <p className="subtitle">The event you are trying to view does not exist.</p>
          <Link className="text-link" to="/">
            Back to all events
          </Link>
        </section>
      </main>
    );
  }

  const booked = bookedByEvent[event.id] ?? 0;
  const remaining = Math.max(event.capacity - booked, 0);

  return (
    <main className="app-shell">
      <section className="panel details-panel">
        <p className="chip">{event.category}</p>
        <h1>{event.title}</h1>
        <p className="subtitle">{event.description}</p>

        <div className="details-grid">
          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          <p>
            <strong>Price:</strong> BDT {event.price}
          </p>
          <p>
            <strong>Total Capacity:</strong> {event.capacity}
          </p>
          <p>
            <strong>Seats Left:</strong> {remaining}
          </p>
        </div>

        <div className="details-actions">
          <Link className="secondary-btn" to="/">
            Back
          </Link>
          <Link
            className="primary-btn text-link-btn"
            to="/"
            onClick={() => onSelect(event.id)}
          >
            Book This Event
          </Link>
        </div>
      </section>
    </main>
  );
}

export default EventDetailsPage;
