import React from 'react';
import { Button } from '@mui/material';

export default function BookingList({ bookings, onEdit, onCancel, onExport }) {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">All Bookings</h2>
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Ref No</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Hotel/Agency</th>
            <th className="px-4 py-2 border">Pickup</th>
            <th className="px-4 py-2 border">Drop-off</th>
            <th className="px-4 py-2 border">Car</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="text-sm hover:bg-gray-50">
              <td className="px-4 py-2 border">{b.refNo}</td>
              <td className="px-4 py-2 border">{new Date(b.datetime).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{b.name}</td>
              <td className="px-4 py-2 border">{b.hotel}</td>
              <td className="px-4 py-2 border">{b.pickupLocation || b.route || '—'}</td>
              <td className="px-4 py-2 border">{b.dropoffLocation || '—'}</td>
              <td className="px-4 py-2 border">{b.carType}</td>
              <td className="px-4 py-2 border space-x-2">
                <Button size="small" variant="outlined" onClick={() => onEdit(b)}>Edit</Button>
                <Button size="small" color="error" variant="outlined" onClick={() => onCancel(b.id)}>Cancel</Button>
                <Button size="small" color="secondary" variant="outlined" onClick={() => onExport(b)}>Voucher</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
