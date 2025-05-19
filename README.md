# Jeevan Ahaar Client

A web application for managing food donations and NGO coordination.

## Features

- NGO Finder: Locate and connect with nearby NGOs
- Donor Dashboard: Manage food donations and track their status
- Food Quality Check: Analyze food quality using AI
- Real-time Chat: Communicate with NGOs and donors

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd jeevan-aahar-client
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB service on your machine

4. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:5000`

## Project Structure

```
src/
├── ngo-finder/         # NGO finder module
├── donor-dashboard/    # Donor dashboard module
├── public/            # Static files
└── index.js          # Main server file
```

## API Endpoints

- `/api/ngos` - NGO management
- `/api/donations` - Donation management
- `/api/food-quality` - Food quality analysis
- `/api/chat` - Real-time chat

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
