// src/services/dataService.js

/* const LOCAL_STORAGE_KEY = 'vip-transfer-bookings';

export const getBookings = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveBookings = (bookings) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
};

export const mockUsers = [
  { id: 1, name: 'Hotel Acropolis', email: 'acropolis@hotel.com', role: 'hotel' },
  { id: 2, name: 'Hotel Poseidon', email: 'poseidon@hotel.com', role: 'hotel' },
  { id: 3, name: 'Hotel Olympus', email: 'olympus@hotel.com', role: 'hotel' },
];
 */


const BOOKINGS_KEY = "vip_app_bookings";

export function getBookings() {
  const saved = localStorage.getItem(BOOKINGS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}
