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
  - Login via Clerk.
  - Upload food details: name, quantity, location, preparation time, expiration, and images.
  - View upload history and current donation status.

- **Receiver (NGO / Food Bank)**
  - Login via Clerk.
  - View available food items near their area.
  - Check food details and images.
  - Approve for pickup if suitable.

---

## 🔄 How It Works

1. **Login & Role Selection**
   - User logs in through Clerk.
   - Role is selected as either **Donor** or **Receiver**.

2. **Food Upload by Donor**
   - Donor submits food details with clear photos and expiration time.
   - Stored in MongoDB with image URL and metadata.

3. **Receiver View & Approval**
   - Receivers browse food listings filtered by location or time.
   - View food details and images.
   - Approve donation for pickup.

4. **Status Tracking**
   - Donors can check whether a donation is "Pending", "Accepted", or "Picked Up".
   - Admin monitors NGO activities to avoid misuse.

---

## 🧑‍💻 Tech Stack

### 💻 Frontend
- HTML
- CSS
- JavaScript

### 🛠 Backend
- Node.js
- Express.js

### 🗄 Database
- MongoDB (via Mongoose)

### 🔐 Authentication
- Clerk for user auth and role-based access

---

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm
- MongoDB Atlas Account

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/jeevan-aahar.git
cd jeevan-aahar

