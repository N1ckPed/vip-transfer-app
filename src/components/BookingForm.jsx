import React, { useState } from "react";

export default function BookingForm({ onSubmit }) {
  const [bookingType, setBookingType] = useState("Arrival");
  const [date, setDate] = useState("");
  const [pickupHour, setPickupHour] = useState("00");
  const [pickupMinute, setPickupMinute] = useState("00");
  const [flightHour, setFlightHour] = useState("00");
  const [flightMinute, setFlightMinute] = useState("00");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [carType, setCarType] = useState("Taxi");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [babies, setBabies] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [countryCode, setCountryCode] = useState("+30");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = ["00", "15", "30", "45"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const pickupTime = `${pickupHour}:${pickupMinute}`;
    const flightTime = `${flightHour}:${flightMinute}`;

    const bookingData = {
      bookingType,
      date,
      pickupTime,
      flightTime,
      pickupLocation,
      dropoffLocation,
      roomNumber,
      flightNumber,
      carType,
      passengers: { adults, kids, babies },
      name: customerName,
      phone: `${countryCode} ${phoneNumber}`,
      notes,
    };

    console.log("✅ Booking submitted:", bookingData);

    if (typeof onSubmit === "function") {
      onSubmit(bookingData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Booking</h2>

      {/* Booking Type */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Booking Type</label>
        <div className="flex gap-4">
          {["Arrival", "Departure", "Transfer"].map((type) => (
            <label key={type} className="flex items-center gap-1">
              <input
                type="radio"
                name="bookingType"
                value={type}
                checked={bookingType === type}
                onChange={() => setBookingType(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="mb-4">
        <label className="block font-medium">Pickup Location</label>
        <input
          type="text"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Heraklion Airport"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Drop-off Location</label>
        <input
          type="text"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Hotel"
        />
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="block font-medium">Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          max={`${new Date().getFullYear()}-12-31`}
        />
      </div>

      {/* Pickup Time */}
      <div className="mb-4">
        <label className="block font-medium">Pickup Time</label>
        <div className="flex gap-2">
          <select value={pickupHour} onChange={(e) => setPickupHour(e.target.value)} className="p-2 border rounded">
            {hours.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
          <span>:</span>
          <select value={pickupMinute} onChange={(e) => setPickupMinute(e.target.value)} className="p-2 border rounded">
            {minutes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Flight Time */}
      <div className="mb-4">
        <label className="block font-medium">Flight Time</label>
        <div className="flex gap-2">
          <select value={flightHour} onChange={(e) => setFlightHour(e.target.value)} className="p-2 border rounded">
            {hours.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
          <span>:</span>
          <select value={flightMinute} onChange={(e) => setFlightMinute(e.target.value)} className="p-2 border rounded">
            {minutes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Optional Fields */}
      <div className="mb-4">
        <label className="block font-medium">Flight Number</label>
        <input
          type="text"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. GR1234"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Room Number</label>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. 301"
        />
      </div>

      {/* Car Type */}
      <div className="mb-4">
        <label className="block font-medium">Car Type</label>
        <select value={carType} onChange={(e) => setCarType(e.target.value)} className="w-full p-2 border rounded">
          <option value="Taxi">Taxi</option>
          <option value="Van">Van</option>
        </select>
      </div>

      {/* Passenger Counts */}
      <div className="mb-4">
        <label className="block font-medium">Passengers</label>
        <div className="flex gap-4">
          <div>
            <label className="text-sm">Adults</label>
            <input type="number" min="0" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="w-20 p-2 border rounded" />
          </div>
          <div>
            <label className="text-sm">Kids</label>
            <input type="number" min="0" value={kids} onChange={(e) => setKids(Number(e.target.value))} className="w-20 p-2 border rounded" />
          </div>
          <div>
            <label className="text-sm">Babies</label>
            <input type="number" min="0" value={babies} onChange={(e) => setBabies(Number(e.target.value))} className="w-20 p-2 border rounded" />
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-4">
        <label className="block font-medium">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. George Orwell"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Phone Number</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="w-24 p-2 border rounded"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="+30"
          />
          <input
            type="tel"
            className="flex-1 p-2 border rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g. 6952452912"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block font-medium">Notes</label>
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit Booking
      </button>
    </form>
  );
}
