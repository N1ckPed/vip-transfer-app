import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import { getUsers } from '../services/userService';
import { getBookings, saveBookings } from '../services/dataService';

export default function EditBookingPage({ bookings, setBookings }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const allBookings = bookings?.length ? bookings : getBookings();
    const found = allBookings.find(b => String(b.id) === id);
    if (found) {
      setBooking(found);
      setFormData(found);
    }
  }, [bookings, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const datetime = formData.date && formData.pickupTime
      ? new Date(`${formData.date}T${formData.pickupTime}`).toISOString()
      : formData.datetime;

    const updatedBooking = {
      ...booking,
      ...formData,
      datetime,
      adults: formData.adults || 0,
      kids: formData.kids || 0,
      babies: formData.babies || 0,
    };

    const currentBookings = getBookings();
    const updatedList = currentBookings.map(b => b.id === booking.id ? updatedBooking : b);

    saveBookings(updatedList);
    if (setBookings) setBookings(updatedList);
    navigate('/');
  };

  if (!formData) return <Typography>Booking not found.</Typography>;

  const isHotel = formData.userRole === 'Hotel';
  const isDeparture = formData.dropoffLocation?.toLowerCase().includes('airport');
  const isArrival = formData.pickupLocation?.toLowerCase().includes('airport');

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>Edit Booking</Typography>

      <TextField
        fullWidth
        label="Customer Name"
        name="name"
        value={formData.name || ''}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={formData.phone || ''}
        onChange={handleChange}
        margin="normal"
      />

      {formData.userRole === 'Travel Agency' ? (
        <TextField
          fullWidth
          label="Route"
          name="route"
          value={formData.route || ''}
          onChange={handleChange}
          margin="normal"
        />
      ) : (
        <>
          <TextField
            fullWidth
            label="Pickup Location"
            name="pickupLocation"
            value={formData.pickupLocation || ''}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Drop-off Location"
            name="dropoffLocation"
            value={formData.dropoffLocation || ''}
            onChange={handleChange}
            margin="normal"
          />
        </>
      )}

      <TextField
        fullWidth
        label="Pickup Time"
        name="pickupTime"
        value={formData.pickupTime || ''}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Vehicle"
        name="carType"
        value={formData.carType || ''}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        select
        SelectProps={{ native: true }}
        fullWidth
        label="Driver"
        name="driver"
        value={formData.driver || ''}
        onChange={handleChange}
        margin="normal"
      >
        <option value="">-- Select Driver --</option>
        {getUsers().filter(u => u.role === 'Driver').map(driver => (
          <option key={driver.email} value={driver.name}>{driver.name}</option>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Hotel Price (€)"
        name="priceHotel"
        type="number"
        value={formData.priceHotel || ''}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Driver Price (€)"
        name="priceDriver"
        type="number"
        value={formData.priceDriver || ''}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Passengers (adults-kids-babies)"
        name="passengerSummary"
        value={`${formData.adults || 0}-${formData.kids || 0}-${formData.babies || 0}`}
        onChange={(e) => {
          const [adults, kids, babies] = e.target.value.split('-').map(Number);
          setFormData({
            ...formData,
            adults: isNaN(adults) ? 0 : adults,
            kids: isNaN(kids) ? 0 : kids,
            babies: isNaN(babies) ? 0 : babies,
          });
        }}
        margin="normal"
      />

      {isHotel && (
        <TextField
          fullWidth
          label="Room Number"
          name="roomNumber"
          value={formData.roomNumber || ''}
          onChange={handleChange}
          margin="normal"
        />
      )}

      {isHotel && isDeparture && (
        <TextField
          fullWidth
          label="Flight Time"
          name="flightTime"
          value={formData.flightTime || ''}
          onChange={handleChange}
          margin="normal"
        />
      )}

      {isHotel && (isDeparture || isArrival) && (
        <TextField
          fullWidth
          label="Flight Number"
          name="flightNumber"
          value={formData.flightNumber || ''}
          onChange={handleChange}
          margin="normal"
        />
      )}

      <TextField
        fullWidth
        label="Notes"
        name="notes"
        value={formData.notes || ''}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={3}
      />

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="error" onClick={() => navigate('/')}>Cancel</Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleSave}>Save Changes</Button>
      </Box>
    </Box>
  );
}