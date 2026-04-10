import { useMemo, useState } from "react";

const defaultForm = {
  fullName: "",
  email: "",
  tickets: 1,
};

function BookingForm({ selectedEvent, availableSeats, onSubmit }) {
  const [form, setForm] = useState(defaultForm);
  const canSubmit = useMemo(() => {
    const validTickets = Number(form.tickets) >= 1 && Number(form.tickets) <= availableSeats;
    return Boolean(form.fullName.trim() && form.email.trim() && selectedEvent && validTickets);
  }, [availableSeats, form.email, form.fullName, form.tickets, selectedEvent]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    onSubmit({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      tickets: Number(form.tickets),
    });
    setForm(defaultForm);
  };

  return (
    <section className="panel booking-form">
      <h2>Book Your Seat</h2>
      <p>{selectedEvent ? selectedEvent.title : "Select an event first"}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.fullName}
          onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
          placeholder="Full name"
        />
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="Email address"
        />
        <input
          type="number"
          min={1}
          max={Math.max(availableSeats, 1)}
          value={form.tickets}
          onChange={(event) => setForm((prev) => ({ ...prev, tickets: event.target.value }))}
          placeholder="Tickets"
        />
        <button type="submit" className="primary-btn" disabled={!canSubmit}>
          Confirm Booking
        </button>
      </form>
      <small>{selectedEvent ? `${availableSeats} seats available` : "No event selected"}</small>
    </section>
  );
}

export default BookingForm;
