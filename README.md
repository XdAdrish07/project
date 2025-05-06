# 🍱 Jeevan Aahar – A Meal. A Smile. A Life.

A Food Waste Management Platform that connects **donors** (restaurants, hotels, individuals) with **receivers** (NGOs and food banks) to redistribute surplus food instead of wasting it. Our mission is to reduce hunger and food waste through smart, transparent, and tech-driven solutions.

---

## 🌍 Live Website

🔗 [Coming Soon](#)

---

## 📖 Overview

Food wastage is a serious global issue. While tons of food are thrown away daily, many people still sleep hungry. **Jeevan Aahar** bridges the gap between **surplus food generators** and **receivers in need**, ensuring safe, efficient, and accountable food redistribution.

---

## 🚀 Core Features

### 👤 User Roles
- **Donor**
  - Can log in and upload food details (name, quantity, location, preparation time, expiration, and images).
  - Can view upload history and status of donations.
  
- **Receiver (NGO / Food Bank)**
  - Can browse available food near their location.
  - View images and food details.
  - Approve and request for pickup based on food quality and availability.

---

## 🔄 How It Works

1. **User Registration & Login**
   - Donor or Receiver registers with role-based access.
   - Authentication via Clerk (or Firebase).

2. **Donor Dashboard**
   - Upload food details: type, quantity, location, time since preparation.
   - Upload clear images of food.
   - The platform may use AI image recognition for quality estimation (future release).

3. **Food Listing**
   - Food becomes available to nearby receivers on their dashboard.
   - Receivers can view food cards with images, description, expiry time, and location.

4. **Receiver Approval**
   - If food is suitable, receivers can approve the request.
   - Once approved, food pickup/delivery is initiated.

5. **Tracking (Upcoming)**
   - Each donation is tracked via a QR code.
   - Future integration with blockchain for full transparency and proof-of-delivery.

6. **Verification & Metrics**
   - Donor can see food status (pending, accepted, delivered).
   - Admin panel for verifying NGOs and monitoring misuse.

---

## 🧑‍💻 Tech Stack

### 💻 Frontend
- HTML, CSS, JavaScript
- Tailwind CSS
- React.js
- Next.js

### 🛠 Backend
- Node.js
- Express.js
- Next.js (API Routes)

### 🗄 Database
- MongoDB (via Mongoose)

### 🔐 Auth & Security
- Clerk / Firebase Authentication
- Role-based routing

### 🔍 Future Integrations
- AI image verification (TensorFlow.js or Google Vision API)
- Blockchain (Ethereum / Hyperledger) for donation tracking
- QR-based scanning and impact analytics

---

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm
- MongoDB Atlas Account

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/jeevan-aahar.git
cd jeevan-aahar
