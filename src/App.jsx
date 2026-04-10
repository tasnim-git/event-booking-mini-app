import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BookingForm from "./components/BookingForm";
import BookingTable from "./components/BookingTable";
import DashboardStats from "./components/DashboardStats";
import EventCard from "./components/EventCard";
import EventFilters from "./components/EventFilters";
import { events } from "./data/events";
import EventDetailsPage from "./pages/EventDetailsPage";

const STORAGE_KEY = "event-bookings";

const getSavedBookings = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

function App() {
  const [bookings, setBookings] = useState(getSavedBookings);
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => [...new Set(events.map((event) => event.category))],
    [],
  );

  const bookedByEvent = useMemo(
    () =>
      bookings.reduce((acc, booking) => {
        acc[booking.eventId] = (acc[booking.eventId] ?? 0) + booking.tickets;
        return acc;
      }, {}),
    [bookings],
  );

  const visibleEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchCategory = category === "All" || event.category === category;
      const matchQuery =
        !query ||
        `${event.title} ${event.venue}`.toLowerCase().includes(query);
      return matchCategory && matchQuery;
    });
  }, [category, search]);

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) ?? null,
    [selectedEventId],
  );

  const availableSeats = selectedEvent
    ? Math.max(selectedEvent.capacity - (bookedByEvent[selectedEvent.id] ?? 0), 0)
    : 0;

  const stats = useMemo(
    () => ({
      totalEvents: events.length,
      totalBookings: bookings.length,
      soldTickets: bookings.reduce((acc, booking) => acc + booking.tickets, 0),
      revenue: bookings.reduce((acc, booking) => acc + booking.tickets * booking.price, 0),
    }),
    [bookings],
  );

  const persist = (next) => {
    setBookings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleBookingSubmit = ({ fullName, email, tickets }) => {
    if (!selectedEvent || tickets > availableSeats) {
      return;
    }

    const newBooking = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      fullName,
      email,
      tickets,
      price: selectedEvent.price,
      createdAt: new Date().toISOString(),
    };

    persist([newBooking, ...bookings]);
  };

  const handleCancelBooking = (id) => {
    persist(bookings.filter((booking) => booking.id !== id));
  };

  const dashboardView = (
    <main className="app-shell">
      <header className="hero">
        <p className="tag">Event Operations</p>
        <h1>Event Booking Mini App</h1>
        <p className="subtitle">A job-ready React project to manage events and attendee bookings.</p>
      </header>

      <DashboardStats {...stats} />

      <EventFilters
        category={category}
        onCategoryChange={setCategory}
        search={search}
        onSearchChange={setSearch}
        categories={categories}
      />

      <section className="layout-grid">
        <div className="events-grid">
          {visibleEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              bookedSeats={bookedByEvent[event.id] ?? 0}
              isSelected={selectedEventId === event.id}
              onSelect={setSelectedEventId}
            />
          ))}
        </div>

        <BookingForm
          selectedEvent={selectedEvent}
          availableSeats={availableSeats}
          onSubmit={handleBookingSubmit}
        />
      </section>

      <BookingTable bookings={bookings} onCancel={handleCancelBooking} />
    </main>
  );

  return (
    <Routes>
      <Route path="/" element={dashboardView} />
      <Route
        path="/events/:eventId"
        element={<EventDetailsPage events={events} bookedByEvent={bookedByEvent} onSelect={setSelectedEventId} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
