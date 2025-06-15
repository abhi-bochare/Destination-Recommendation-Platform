# 🌍 Destination Recommendation Platform – TravelGenius

A personalized travel recommendation platform that helps users discover ideal destinations based on preferences like interests, budget, travel style, and more. Travel smarter and better with **TravelGenius**!

[🚀 Live Demo](https://dest-recommendation.netlify.app/) 

---

## ✨ Features

🔐 User Authentication (Sign Up, Login with Firebase)

🧠 Smart Recommendations based on interests, budget, activities

🗺️ Interactive Map View using Leaflet

⭐ Favorites Management stored per user

📌 Itinerary Builder for trip planning

➕ Destination Comparison (up to 3 destinations)

🔥 Trending Destinations (based on review count)

🔍 Search, Filters & Pagination

💬 User Reviews Section (static demo)

📱 Responsive UI (desktop, tablet, mobile)

## 🧪 Tech Stack
Frontend	Firebase Backend	State Management
React + Vite	Firebase Firestore	Redux Toolkit
Tailwind CSS	Firebase Auth	Redux Persist
React Router DOM		
Leaflet (Maps)		

## 📁 Folder Structure

src/
├── assets/
├── components/
├── pages/
├── data/
├── redux/
├── routes/
├── utils/
├── firebase.js
└── App.jsx\

## 🧑‍💻 Getting Started


1. Clone the Repository
   
git clone https://github.com/abhi-bochare/Destination-Recommendation-Platform.git

cd Destination-Recommendation-Platform

2. Install Dependencies

npm install

3. Configure Firebase
   
Go to Firebase Console

Create a new project

Enable Authentication (Email/Password)

Set up Cloud Firestore

Add your Firebase config in src/firebase.js:

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

## 🚀 Run Locally

npm run dev
Visit: http://localhost:5173

## ✅ Features to Improve

 Add real-time review submission & edit/delete

 Connect itinerary to external calendar apps

 Integrate flight/hotel API

 Dark mode support

## 🧑‍🎓 Author

Abhishek Bochare
📧 abhishekbochare2003@gmail.com

🙌 Support & Contribution
Contributions, issues and feature requests are welcome!
If you like this project, please give it a ⭐️ and share it with fellow developers.



---
