import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack
} from '@mui/material';

const ExportPanel = ({ bookings }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const exportCSV = () => {
    const filtered = bookings.filter(b => {
      const d = new Date(b.datetime);
      return (!startDate || d >= new Date(startDate)) &&
             (!endDate || d <= new Date(endDate));
    });

    const headers = [
      'Name',
      'Hotel',
      'Pickup',
      'Drop-off',
      'Date',
      'Time',
      'Vehicle',
      'Status',
      'Driver',
      'Notes'
    ];

    const rows = filtered.map(b => [
      b.name,
      b.hotel,
      b.pickup,
      b.dropoff,
      new Date(b.datetime).toLocaleDateString(),
      new Date(b.datetime).toLocaleTimeString(),
      b.vehicle,
      b.status || 'upcoming',
      b.driver || '',
      b.notes || ''
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${startDate || 'all'}-to-${endDate || 'all'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ mt: 4, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h6" mb={2}>📤 Export Bookings</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={exportCSV}
        >
          Export CSV
        </Button>
      </Stack>
    </Box>
  );
};

export default ExportPanel;
