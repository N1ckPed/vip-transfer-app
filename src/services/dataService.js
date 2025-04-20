// src/services/dataService.js

const BOOKINGS_KEY = "vip_app_bookings";

export function getBookings() {
  const saved = localStorage.getItem(BOOKINGS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}
