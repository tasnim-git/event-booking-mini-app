function DashboardStats({ totalEvents, totalBookings, soldTickets, revenue }) {
  const cards = [
    { label: "Events", value: totalEvents },
    { label: "Bookings", value: totalBookings },
    { label: "Tickets Sold", value: soldTickets },
    { label: "Revenue", value: `BDT ${revenue}` },
  ];

  return (
    <section className="stats-grid">
      {cards.map((card) => (
        <article key={card.label} className="stat-card">
          <p>{card.label}</p>
          <h3>{card.value}</h3>
        </article>
      ))}
    </section>
  );
}

export default DashboardStats;
