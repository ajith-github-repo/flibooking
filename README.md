# FliBooking - Flight Booking Web Application

## 🧩 Tech Stack & Framework Justification

### 🔧 Frontend: React + Parcel + Tailwind CSS

- **React (v19)**  
  React is known for its faster dom manipulation. React's hooks (`useState`, `useEffect`, `useNavigate`) allow us to manage state and side effects cleanly across the app. It's highly maintainable and widely adopted in the industry.

- **Parcel**  
  A zero-config bundler that is simpler and faster than Webpack for small to medium-sized projects. It supports modern JavaScript out-of-the-box with minimal boilerplate.

- **Tailwind CSS**  
  Utility-first CSS framework that allows rapid UI development without switching between HTML and CSS files. It ensures consistent styling with minimal custom CSS, and excellent responsiveness via utility classes.

---

### 🛠️ Backend: Node.js + Express

- **Express.js**  
  Lightweight and flexible Node.js framework suitable for building RESTful APIs. Express is mature, well-documented, and integrates smoothly with middlewares like `express-validator` for validation and `cors` for cross-origin support.

- **Validation using `express-validator`**  
  Ensures backend robustness by validating user input (e.g., required fields, email format, ID structure) before processing. This complements frontend validation and improves security.

---

### 📦 API Design

- RESTful API routes are implemented using Express routers (`/api/flights`, `/api/bookings`)
- Frontend communicates with backend via `axios` with proper `try/catch` and feedback mechanisms
- Pagination and sorting are supported server-side
- Bookings are created with validated input, and a unique Booking ID is returned
- Data is mocked/stored in memory for the prototype stage

---

### 🎯 Design Principles

- **Single Responsibility Principle (SRP)**: React components are cleanly divided into reusable parts (e.g., `FlightCard`, `FlightList`, `BookingForm`)
- **User Experience**:
  - Form validations on both frontend and backend
  - Immediate feedback on booking confirmation with redirect
  - Consistent design with Tailwind CSS utility classes
- **Responsive Design**: All pages and form elements adapt well to mobile and desktop views using Tailwind grid and flex utilities

---

### Steps to Run

git clone https://github.com/ajith-github-repo/flibooking.git
cd flibooking

### Backend Setup

cd flibooking-server
npm install
npm start

Starts backend server on http://localhost:5500

Uses mock flight and booking data

API base: /api

### Frontend Setup

cd flibooking-ui
npm install
npm start

Starts frontend on http://localhost:1234

### API Reference

GET /api/flights

Search available flights.

✅ Query Parameters:

* source (required)
* destination (required)
* date (required) — format: YYYY-MM-DD
* page (optional) — default: 1
* limit (optional) — default: 5
* sortBy (optional): price, duration
* order (optional): asc, desc

📦 Example Request:

GET /api/flights?source=DEL&destination=BLR&date=2025-07-16&page=1&limit=2

🧾 Example Response:

{
  "flights": [
    {
      "id": "F101",
      "source": "DEL",
      "destination": "BLR",
      "departureTime": "2025-07-16T08:00:00",
      "arrivalTime": "2025-07-16T10:30:00",
      "price": 4300
    },
    {
      "id": "F102",
      "source": "DEL",
      "destination": "BLR",
      "departureTime": "2025-07-16T12:15:00",
      "arrivalTime": "2025-07-16T14:45:00",
      "price": 4600
    }
  ],
  "page": 1,
  "totalPages": 2
}

🧾 POST /api/bookings

Book a flight (one-way or round-trip).

✅ Request Body:

{
  "passenger": {
    "name": "Ajith Kumar",
    "email": "ajith@example.com",
    "phone": "9876543210"
  },
  "onwardFlightId": "F101",
  "returnFlightId": "F202" // optional
}

📦 Example Response:

{
  "message": "Booking successful",
  "bookingId": "BK927364",
  "email": "ajith@example.com"
}

✅ Validation Rules


Booking Form (Frontend + Backend):

* Name: Required, alphabetic (no digits or symbols)
* Email: Required, must be valid
* Phone: Optional, but if provided: 6–10 digits only
* onwardFlightId: Required
* returnFlightId: Optional


## Application Screenshots

![Alt text](<Screenshot 2025-07-14 at 11.20.38 AM.png>)
![Alt text](<Screenshot 2025-07-14 at 11.20.53 AM.png>)
![Alt text](<Screenshot 2025-07-14 at 11.21.02 AM.png>)
![Alt text](<Screenshot 2025-07-14 at 11.21.25 AM.png>)
![Alt text](<Screenshot 2025-07-14 at 11.21.34 AM.png>)
![Alt text](<Screenshot 2025-07-14 at 11.22.56 AM.png>)
![Alt text](<Screenshot 2025-07-14 at 11.23.17 AM.png>)
![Alt text](<Screenshot 2025-07-14 at 11.33.37 AM.png>)