import React, { useState } from "react";
import AdminCalendar from "./AdminCalendar";
import BookingForm from "./BookingForm";
import UsersPage from "./UsersPage";

export default function AdminLayout({
  currentUser,
  bookings,
  onAddBooking,
  onCancelBooking,
  onDriverChange,
  onExportBooking,
  onEventClick,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState("calendar");

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
      <nav className="flex gap-4 mb-6">
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
        <button
          onClick={() => setActiveTab("addBooking")}
          className={`px-4 py-2 rounded ${
            activeTab === "addBooking"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Add Booking
        </button>
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
          />
        )}

        {activeTab === "addBooking" && (
          <BookingForm onSubmit={onAddBooking} isAdmin={true} />
        )}

        {activeTab === "users" && <UsersPage />}
      </div>
    </div>
  );
}
