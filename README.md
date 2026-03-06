# Insight-Tube
### AI Powered Video Learning Platform

Insight-Tube is a **full-stack MERN application** that transforms YouTube videos into structured learning material.  
It allows users to organize educational videos into folders, take notes while watching, track learning progress, and generate **AI-powered summaries and quizzes** using the Gemini API.

The goal of this project is to make long YouTube courses easier to study, revise, and practice with less distraction.

---

# Live Demo

Frontend:  
https://insight-tube-frontend.onrender.com  

Backend API:  
https://backend-frl9.onrender.com

---

# Screenshots

![Home](<img width="1919" height="947" alt="Screenshot 2026-03-06 225556" src="https://github.com/user-attachments/assets/edc694dc-5e10-4f62-8a5f-b7d4f606c7ba" />)  
![Dashboard](<img width="1919" height="950" alt="Screenshot 2026-03-06 225805" src="https://github.com/user-attachments/assets/b1a2471e-256e-4d8d-84e8-501ff94fe6dc" />)
![Folder](<img width="1895" height="946" alt="Screenshot 2026-03-06 230036" src="https://github.com/user-attachments/assets/cde57359-164e-4828-a662-5e26d0e97119" />)
![Video Player](<img width="1891" height="1619" alt="image (2)" src="https://github.com/user-attachments/assets/f1d74a37-eae3-429b-84c7-dc92c2578a04" />)


---

# Features

### User Management
- User registration and login
- Secure authentication using JWT
- Session management

### Learning Organization
- Create subject folders
- Add and manage YouTube videos
- Organize learning resources efficiently

### Video Learning Tools
- Embedded YouTube video player
- Timestamped notes while watching videos
- Save and manage personal learning notes

### AI Powered Features
- Generate video **summaries** using Gemini API
- Generate **quiz questions** from video content
- Helps users quickly revise concepts

#### Learning Progress
- Mark videos as completed
- Visual **progress bar** for each folder/course

### Search
- Search notes and videos by keywords

### UI / UX
- Clean dashboard interface
- Responsive design for different screen sizes

---

# Tech Stack

### Frontend
- React (Vite)
- TailwindCSS / Material UI
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI Integration
- Google Gemini API  
  - Video transcript summarization  
  - Quiz generation  

### Other Tools
- Passport Authentication
- REST API architecture
- Render for deployment
- Rapid Api for transcript

---

# Project Architecture

The application follows a **MERN architecture**.

Frontend (React)
|
| REST API Requests
|
Backend (Node.js + Express)
|
| Database Queries
|
MongoDB Database
|
| AI Processing
|
Gemini API


Flow example for AI summary generation:

1. User requests summary for a video  
2. Backend fetches transcript  
3. Transcript sent to Gemini API  
4. AI generates summary  
5. Summary returned to frontend  

---

# Folder Structure
```
Insight-Tube
│
├── Frontend
| ├── src
│ | ├── components
│ | ├── pages
│ | ├── services
│ | └── App.jsx
│ └── public
│
├── Backend
│ ├── controllers
│ ├── routes
│ ├── models
│ ├── middlewares.js
│ └── app.js
│
└── README.md
```


---

# Installation & Setup

### 1. Clone the repository
```
git clone https://github.com/Anubhavsingh9905/Insight-Tube.git
cd Insight-Tube
```

---

### 2. Backend Setup

```
cd Backend
npm install
```


Create a `.env` file

``` .env
PORT=5000
MONGO_URL=your_mongodb_connection
API_KEY=your_gemini_api_key
SESSION_SECERET=your_session_seceret
FRONTEND_URL=your_frontend_url
RAPID_API_KEY=your_rapid_api_key
```


Run backend

```
npm start
```


---

### 3. Frontend Setup

```
cd Frontend
npm install
```

Create a `.env` file
```
VITE_API_URL=api_url
```

Run Frontend
```
npm run dev
```



---

# Future Improvements

Some features that can further improve the platform:

- Flashcards generated from videos
- AI recommended videos based on learning history
- Collaborative study groups
- Better analytics for learning progress
- Improved mobile responsiveness

---

# What This Project Demonstrates

This project demonstrates practical experience in:

- Full-stack MERN development
- REST API design
- AI API integration
- Database schema design
- Authentication systems
- Building scalable learning tools

---

# Author

**Anubhav Singh**

GitHub:  
https://github.com/Anubhavsingh9905  

LinkedIn:  
https://www.linkedin.com/in/anubhav-kumar-singh-507265229/

---

# License

This project is open source and available under the **MIT License**.
