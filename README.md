                                                                           #♻️ E-Yukta: AI-Powered E-Waste Management Platform
**URL**: https://e-yukta-recycle-connect.lovable.app/welcome

E-Yukta is a unified AI-powered digital platform designed to promote responsible e-waste disposal, circular economy practices, and environmental awareness. It connects consumers, kabadiwalas, recyclers, and corporates through a smart and traceable system of waste collection, recycling, and sustainability tracking—aligned with the UN’s SDG 12: Responsible Consumption and Production.

🌟 Key Features

🧠 AI-Based Waste Identification (via Google Cloud Vision)

🚛 Real-time Pickup Booking & Kabadiwala Allocation

📦 E-Yukta Kart: Buy/Sell Refurbished Electronics

🎓 E-Yukta Awareness Hub: Interactive learning, sessions, and challenges

🏢 Corporate Dashboard: Track CSR activities, EPR compliance, audit reports & generate certifications

📲 Kabadiwala App: Scrap pickup, training, certification, and earnings

🏭 Recycler Portal: Inventory management, destruction certification, data uploads

🔒 Role-Based Login System with Firebase Authentication

🛠️ Technologies Used

Frontend: React.js (Web), Flutter (Mobile App)

Backend: Node.js with Express.js, Firebase Cloud Functions

Database: Firestore (Cloud NoSQL DB)

AI Integration: Google Cloud Vision API

Realtime Notifications: Firebase Cloud Messaging (HTTP v1)

Geolocation: Google Maps API + Distance Matrix API

Payments: Google Pay API

Chatbot: Dialogflow

Awareness Content: YouTube Data API

Video Sessions: Google Meet API + Calendar API

🚀 Getting Started (Setup Instructions)

Clone this repository:

git clone https://github.com/your-username/e-yukta-app.git

Install dependencies:

For Web: cd frontend npm install

For Backend/Firebase: cd functions npm install

Configure Firebase:

Create a Firebase project

Enable Firestore, Auth, Cloud Functions

Add your firebaseConfig in /frontend/src/firebase.js

Set up Google APIs:

Enable required APIs in Google Cloud Console

Generate your API keys and add to your environment

Run locally:

For Frontend: npm start

For Functions: firebase emulators:start

Deploy: firebase deploy

📦 Folder Structure

e-yukta-app/ │ ├── frontend/ # React or Flutter app for web/mobile │ ├── src/ │ ├── public/ │ ├── functions/ # Firebase Cloud Functions (Node.js) │ ├── index.js │ ├── database/ # Firestore rules and indexes ├── assets/ # Icons, banners, images ├── README.md └── .gitignore

🤝 Contribution Guidelines

We welcome contributions to improve and expand E-Yukta. To contribute:

Fork the repository.

Create a new branch:

git checkout -b feature/your-feature-name

Commit your changes:

git commit -m "Add: Feature explanation"

Push to your forked repo:

git push origin feature/your-feature-name

Create a Pull Request from your GitHub dashboard.

📄 License

This project is licensed under the MIT License – see the LICENSE file for details.

📬 Contact

For queries, feedback, or partnership opportunities, please reach out at: eyukta2025@gmail.com
