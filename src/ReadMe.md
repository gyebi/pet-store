🐾 Adopt-a-Pet App

A React + Firebase web application that allows users to browse pets available for adoption and securely add new pets with automatically generated images.

🚀 Overview

Adopt-a-Pet is a cloud-backed pet adoption app built with modern web technologies.
It demonstrates real-world patterns such as authentication, database integration, external API usage, and clean state-driven UI design.

✨ Features

🔍 View pets available for adoption (public access)

🔐 User authentication (Email & Password)

➕ Logged-in users can put pets up for adoption

🐶 Automatic dog images fetched from the Dog CEO API

🗄️ Pet data stored in Firebase Firestore

🖼️ Bio card view with pet details and image

⏳ Loading & error handling

📱 Responsive, simple UI

🛠️ Tech Stack

Frontend: React (Vite)

Backend / Cloud: Firebase

Firestore (database)

Firebase Authentication

External API: Dog CEO API (random dog images)

Styling: CSS

🧠 Architecture (High Level)
React App
│
├─ Firebase Authentication
│   └─ Required to add pets
│
├─ Firestore Database
│   └─ Stores pet metadata (name, age, type, image URL, status)
│
└─ Dog CEO API
    └─ Provides fallback images for dogs


Firestore is the single source of truth

Images are resolved at save time and reused

UI reads only from Firestore

🔐 Authentication Rules

👀 Anyone can browse pets

🔑 Only authenticated users can add pets

🛡️ Designed for future ownership & moderation rules

📦 Getting Started

Clone the repository

Install dependencies:

npm install


Add your Firebase config in firebase.js

Run the app:

npm run dev

📌 Future Enhancements

Image upload via camera or device (Firebase Storage)

Edit pet images after creation

Real-time updates with Firestore listeners

User ownership & moderation

Admin dashboard

👤 Author

Winfred Gyebi
Built as a hands-on project to explore real-world React, Firebase, and API integration patterns.