# VIP Transfer Booking Web App

A web application designed for VIP transfer bookings, allowing users to schedule and manage luxury transportation services.

## 🚀 Features

- User registration and authentication
- Booking management system
- Admin dashboard for overseeing bookings
- Responsive design for mobile and desktop

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/N1ckPed/vip-transfer-app.git
   
2. Navigate to the project directory:
   ```bash
   cd vip-transfer-app
   
3. Install dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   npm run dev
   ```
   Then open your browser at http://localhost:5173

## 🛠️ Technologies Used

- **React 19** – Core frontend library
- **Vite** – Lightning-fast bundler and dev server
- **Tailwind CSS** – Utility-first CSS framework for responsive design
- **MUI (Material UI)** – Modern UI components with `@mui/material` and `@emotion/*`
- **React Router DOM** – Client-side routing
- **React Big Calendar** – Event calendar for booking visualization
- **React Datepicker & Time Picker** – Date and time selection
- **i18next + react-i18next** – Internationalization and language switching
- **date-fns** – Date formatting and manipulation
- **jsPDF** – Generate downloadable PDF vouchers
- **ESLint** – Code linting for consistency and quality

## 🔐 User Roles
- Admin
   - View and manage all bookings
   - Create/edit users and routes
   - Export reports and vouchers

- Hotel
   - Submit bookings with custom pickup/drop-off info
   - View and manage only their bookings

- Travel Agency
   - Use smart route selector (no pickup/drop-off)
   - View and manage only their bookings

- Driver
   - Only stored for assignment (non-login users)
## 📝 Notes
- No sensitive credentials or APIs are stored in this repository.
- Booking data and user state are currently managed in memory (demo/demo users).
- Admin tools include CSV and PDF export, with cost and driver assignment breakdowns.

## 📄 License
This project is licensed under the MIT License.

## 📞 Contact
For inquiries or support, please contact nick.r.ped@gmail.com.
