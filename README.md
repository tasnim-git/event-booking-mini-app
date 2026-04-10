# Event Booking Mini App

Job-ready React project for event discovery and seat booking operations.

## Why This Project

This app demonstrates practical frontend skills for hiring:

- Component-based architecture
- Complex state management with derived values
- Form validation and business rules (seat availability)
- Search and filter experience
- Local persistence using browser localStorage
- Responsive dashboard UI

## Features

- Browse event catalog
- Search by title/venue and filter by category
- Select event and create attendee booking
- Capacity-aware booking (cannot exceed remaining seats)
- Booking cancellation
- Real-time dashboard metrics: events, bookings, sold tickets, revenue
- Data persistence after refresh

## Tech Stack

- React 19
- Vite 8
- CSS

## Run Locally

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
	components/
		BookingForm.jsx
		BookingTable.jsx
		DashboardStats.jsx
		EventCard.jsx
		EventFilters.jsx
	data/
		events.js
	App.jsx
	App.css
	index.css
```

## Suggested Next Upgrades

- Edit booking details
- Add date-range filters
- CSV export/import
- Authentication and role-based views
- Integrate backend API (Node/Firebase/Supabase)
