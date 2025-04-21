import React, { useState } from "react";
import AdminCalendar from "./AdminCalendar";
import BookingForm from "./BookingForm";
import UsersPage from "./UsersPage";
import BookingList from "./BookingList";

export default function AdminLayout({
  currentUser,
  bookings,
  onAddBooking,
  onCancelBooking,
  onDriverChange,
  onExportBooking,
  onEventClick,
  onEditBooking,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState("calendar");
  const [showBookingDropdown, setShowBookingDropdown] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            👋 Logged in as <strong>{currentUser?.name}</strong>
          </span>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex gap-4 mb-6 relative">
        <button
          onClick={() => setActiveTab("calendar")}
          className={`px-4 py-2 rounded ${
            activeTab === "calendar"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Calendar
        </button>

        <div className="relative">
          <button
            onClick={() => setShowBookingDropdown(prev => !prev)}
            className={`px-4 py-2 rounded ${
              ["addBooking", "bookingList"].includes(activeTab)
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            Bookings ▾
          </button>
          {showBookingDropdown && (
            <div className="absolute z-10 mt-2 bg-white border rounded shadow-md w-48">
              <button
                onClick={() => {
                  setActiveTab("addBooking");
                  setShowBookingDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                ➕ Add Booking
              </button>
              <button
                onClick={() => {
                  setActiveTab("bookingList");
                  setShowBookingDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                📋 All Bookings
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Users
        </button>
      </nav>

      {/* Content */}
      <div>
        {activeTab === "calendar" && (
          <AdminCalendar
            bookings={bookings}
            onEventClick={onEventClick}
            onEditBooking={onEditBooking}
          />
        )}

        {activeTab === "addBooking" && (
          <BookingForm onSubmit={onAddBooking} isAdmin={true} />
        )}

        {activeTab === "bookingList" && (
          <BookingList
            bookings={bookings}
            onEdit={onEditBooking}
            onCancel={onCancelBooking}
            onExport={onExportBooking}
          />
        )}

        {activeTab === "users" && <UsersPage />}
      </div>
    </div>
  );
}
