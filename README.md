# Stock Market Dashboard

A full-stack stock market tracking application with authentication, real-time stock data, and a user-friendly dashboard.

## 🚀 Features
- **User Authentication**: Secure login and registration using JWT.
- **Stock Market Data**: Fetch real-time stock data from Finnhub API.
- **Dashboard**: Search and view stock details.
- **WebSockets**: Real-time stock price updates.
- **Favorite Stocks**: Save and track your favorite stocks.
- **Mobile & Web App**: Built using React.js for web and React Native for mobile.

## 🛠️ Tech Stack
### Backend
- **Node.js** with **TypeScript**
- **Express.js** for API services
- **MySQL** for database
- **JWT Authentication**
- **WebSockets** for real-time updates

### Frontend
- **React.js (Web App)** with Tailwind CSS
- **React Native (Mobile App)**

## 🏗️ Project Structure
```
stock-market-dashboard/
├── backend/            # Node.js backend with microservices
│   ├── auth-service/   # Handles authentication
│   ├── stock-service/  # Fetches stock data
│   ├── portfolio-service/ # Manages user stock portfolio
│   ├── gateway/        # API Gateway for microservices
│   └── database/       # MySQL database setup
│
├── web-app/            # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   └── services/
│
├── mobile-app/         # React Native frontend
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── navigation/
│   │   ├── context/
│   │   └── services/
│
└── README.md           # Project documentation
```

## 🔧 Setup Instructions
### 1️⃣ Backend Setup
```sh
cd backend
npm install
npm run dev
```
- Create a `.env` file and add:
```env
PORT=5000
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
JWT_SECRET=your_jwt_secret
FINNHUB_API_KEY=your_api_key
```

### 2️⃣ Web App Setup
```sh
cd web-app
npm install
npm run dev
```

### 3️⃣ Mobile App Setup
```sh
cd mobile-app
npm install
npm start
```

## 📌 API Endpoints
### Authentication (Auth Service)
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate user and return JWT |

### Stock Service
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/stocks` | Get stock data |
| GET | `/stocks/:symbol` | Get stock details by symbol |

## 📜 License
This project is licensed under the MIT License.

