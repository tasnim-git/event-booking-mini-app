function BookingTable({ bookings, onCancel }) {
  return (
    <section className="panel bookings">
      <h2>Recent Bookings</h2>
      {bookings.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Attendee</th>
                <th>Event</th>
                <th>Tickets</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.fullName}</td>
                  <td>{booking.eventTitle}</td>
                  <td>{booking.tickets}</td>
                  <td>
                    <button type="button" className="danger-btn" onClick={() => onCancel(booking.id)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No bookings yet.</p>
      )}
    </section>
  );
}

export default BookingTable;
