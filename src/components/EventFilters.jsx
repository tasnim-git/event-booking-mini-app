function EventFilters({ category, onCategoryChange, search, onSearchChange, categories }) {
  return (
    <section className="panel filters">
      <h2>Browse Events</h2>
      <div className="filter-grid">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or venue"
        />

        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="All">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default EventFilters;
