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
git clone https://github.com/XdAdrish07/project.git
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

## Deployment on Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy to Vercel:
```bash
vercel
```

Or deploy directly from GitHub:
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings
6. Click "Deploy"

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
