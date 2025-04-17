import React, { useState, useEffect } from 'react';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import Modal from './components/Modal';
import AdminLayout from './components/AdminLayout';
import AdminCalendar from './components/AdminCalendar';
import jsPDF from 'jspdf';
import LanguageSwitcher from './components/LanguageSwitcher';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button as MUIButton,
  Stack,
  TextField
} from '@mui/material';
import { getBookings, saveBookings } from './services/dataService';

function App() {
  const [bookings, setBookings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = getBookings();
    console.log("📁 Loaded Bookings:", stored);
    setBookings(stored);
  }, []);

  useEffect(() => {
    saveBookings(bookings);
    console.log("📦 Saved Bookings:", bookings);
  }, [bookings]);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

const handleBooking = (data) => {
  const now = new Date();
  const datetime = new Date(`${data.date}T${data.pickupTime}`);
  const newBooking = {
  ...data,
  id: Date.now(),
  datetime: datetime.toISOString(),
  createdAt: now.toISOString(),
  hotel: currentUser.role === 'admin' ? 'Admin'
        : currentUser.role === 'Hotel' || currentUser.role === 'Travel Agency'
          ? currentUser.name
          : 'Unknown',
  userRole: currentUser.role,
};


  setBookings((prev) => {
    const updated = [...prev, newBooking];
    console.log("📘 Updated Bookings:", updated);
    saveBookings(updated);
    return updated;
  });

  setShowSuccess(true);
  setTimeout(() => setShowSuccess(false), 5000);
};



  const handleCancelBooking = (id) => {
    const now = new Date();
    setBookings(prev =>
      prev.map(b => {
        const created = new Date(b.createdAt);
        const diffMinutes = (now - created) / 60000;
        if (b.id === id && (currentUser.role === 'admin' || diffMinutes <= 30)) {
          return { ...b, status: 'cancelled' };
        }
        return b;
      })
    );
  };

  const handleDriverChange = (id, driverName) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === id ? { ...b, driver: driverName } : b
      )
    );
  };

  const exportBookingToPDF = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('VIP Transfer Voucher', 20, 20);

    doc.setFontSize(12);
    const lines = [
      `Name: ${booking.name}`,
      `Hotel: ${booking.hotel}`,
      `Pickup: ${booking.pickup}`,
      `Drop-off: ${booking.dropoff}`,
      `Date: ${new Date(booking.datetime).toLocaleDateString()}`,
      `Time: ${new Date(booking.datetime).toLocaleTimeString()}`,
      `Vehicle: ${booking.vehicle}`,
      `Driver: ${booking.driver || 'Not assigned'}`,
      `Notes: ${booking.notes || '—'}`
    ];

    lines.forEach((line, i) => {
      doc.text(line, 20, 40 + i * 10);
    });

    doc.save(`transfer-${booking.name}-${booking.id}.pdf`);
  };

  const getStatus = (datetime) => {
    const now = new Date();
    const bookingTime = new Date(datetime);
    return bookingTime > now ? 'upcoming' : 'done';
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const isAdmin = currentUser.role === 'admin';
const visibleBookings = isAdmin
  ? bookings
  : bookings.filter(b => b.hotel === currentUser.name);


  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow mt-8">
      {isAdmin ? (
        <AdminLayout
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
          bookings={bookings}
          onAddBooking={handleBooking}
          onCancelBooking={handleCancelBooking}
          onDriverChange={handleDriverChange}
          onExportBooking={exportBookingToPDF}
          onEventClick={(booking) => {
            setSelectedDate(new Date(booking.datetime));
            setShowModal(true);
          }}
        />
      ) : (
        <>
          {showSuccess && (
            <div className="bg-green-100 text-green-800 px-2 py-2 mb-4 rounded shadow-sm text-center">
              ✅ Booking received! We’ll confirm it shortly.
            </div>
          )}
          <div className="mb-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              👋 Logged in as <strong>{currentUser?.name}</strong>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <MUIButton
                variant="contained"
                color="error"
                size="small"
                onClick={() => setCurrentUser(null)}
              >
                Logout
              </MUIButton>
            </div>
          </div>

          <BookingForm onSubmit={handleBooking} isAdmin={false} />

          <div className="mt-12">
  {console.log("📘 Visible Bookings in Admin:", visibleBookings)}
  <AdminCalendar
    bookings={visibleBookings}
    onEventClick={(booking) => {
      setSelectedDate(new Date(booking.datetime));
      setShowModal(true);
    }}
  />
</div>

        </>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Typography variant="h6" gutterBottom>
          Transfers on {selectedDate?.toLocaleDateString()}
        </Typography>

        {visibleBookings
          .filter(b => new Date(b.datetime).toDateString() === selectedDate?.toDateString())
          .map((b) => {
            const status = b.status || getStatus(b.datetime);
            const now = new Date();
            const created = new Date(b.createdAt);
            const diffMinutes = (now - created) / 60000;
            const canCancel = isAdmin || diffMinutes <= 30;

            return (
              <Card key={b.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body1"><strong>Status:</strong> {status}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(b.datetime).toLocaleTimeString()}
                    </Typography>
                  </Stack>

                  <Typography variant="body2"><strong>Name:</strong> {b.name}</Typography>
		{isAdmin && (
			<Typography variant="body2">
			<strong>{b.userRole === 'Travel Agency' ? 'Travel Agency:' : 'Hotel:'}</strong> {b.hotel}
		</Typography>
		)}



                  <Typography variant="body2"><strong>Pickup Location:</strong> {b.pickupLocation}</Typography>
                  <Typography variant="body2"><strong>Drop-off Location:</strong> {b.dropoffLocation}</Typography>
				  <Typography variant="body2"><strong>Pickup Time:</strong> {b.pickupTime}</Typography>

                  {isAdmin && (
                    <TextField
                      label="Driver"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ mt: 2 }}
                      value={b.driver || ''}
                      onChange={(e) => handleDriverChange(b.id, e.target.value)}
                    />
                  )}

                  {status !== 'cancelled' && canCancel && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <MUIButton
                        onClick={() => handleCancelBooking(b.id)}
                        variant="outlined"
                        color="error"
                        size="small"
                      >
                        Cancel
                      </MUIButton>
                      {isAdmin && (
                        <MUIButton
                          onClick={() => exportBookingToPDF(b)}
                          variant="outlined"
                          color="secondary"
                          size="small"
                          sx={{ ml: 1 }}
                        >
                          Voucher
                        </MUIButton>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
      </Modal>
    </div>
  );
}

export default App;
