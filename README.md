# TimeTable_Backend_Node

Backend server for timetable app

## Overview

This project is a backend server for managing and centralizing the workload of timetables and meetings for VPM's RZ Shah College. It is built using Node.js, Express, and MongoDB (via Mongoose). The backend provides RESTful APIs for handling users, lectures, rooms, streams, divisions, timetables, shifts, time slots, committees, meetings, and more.

### Features

- **User Management:** Registration, login, roles (admin, staff, management, student), and authentication.
- **Timetable Management:** CRUD operations for lectures, rooms, streams, divisions, shifts, and time slots.
- **Meeting Management:** Schedule and manage meetings, committees, and committee members.
- **Role-Based Access Control:** Middleware to restrict access to certain routes based on user roles.
- **Max Lectures Per Day:** Set and enforce maximum lectures per day for professors.
- **Stream-Subject and Professor-Stream Mapping:** Manage mappings between streams, subjects, and professors.
- **API Security:** Uses JWT for authentication and secure cookies.
- **CORS Support:** Configurable CORS for frontend integration.
- **Error Handling:** Centralized error middleware for consistent API responses.

## Project Structure

```
.
├── app.js                   # Main entry point
├── package.json             # Project dependencies and scripts
├── .env                     # Environment variables (not committed)
├── Config/                  # Database and CORS configuration
├── Controllers/             # Business logic for each resource
├── MiddleWares/             # Authentication, authorization, error handling
├── Models/                  # Mongoose schemas and models
├── Routes/                  # Express route definitions
├── Utils/                   # Utility functions (e.g., TryCatch, ErrorHandler)
└── postman tests/           # Postman collections for API testing
```

## API Endpoints

- **User:** `/api/v1/user`
- **Lecture:** `/api/v1/college/lectures`
- **Room:** `/api/v1/college/rooms`
- **Stream:** `/api/v1/college/stream`
- **Division:** `/api/v1/college/division`
- **Timetable:** `/api/v1/college/calendar`, `/api/v1/college/schedule`
- **Shift:** `/api/v1/college/shift`
- **TimeSlot:** `/api/v1/college/timeslot`
- **Committee:** `/api/v1/management/committee`
- **Meeting:** `/api/v1/meeting`
- **Max Lectures Per Day:** `/api/v1/max-lec`
- **Mappings:** `/api/v1/college/mapping/stream-subject`, `/api/v1/college/mapping/professor-stream`

---

## Node.js installation steps for Windows

1. Download and install the latest version of Node.js from [nodejs.org](https://nodejs.org/).

## VSCode installation Steps + Plugins

- Install [Visual Studio Code](https://code.visualstudio.com/).
- Recommended Plugin: latest version of 'nodeJs'.

---

## Setup

**Step 1:** Clone the project using command  
```sh
git clone https://github.com/VPMWebApps/TimeTable_Backend_Node.git
```

**Step 2:** Delete the file named `package-lock.json`.

**Step 3:** Open project terminal (VS Code terminal: <kbd>Ctrl</kbd> + <kbd>J</kbd>).  
Navigate to the root directory of the project `../TIMETABLE_BACKEND_NODE/` and run:  
```sh
npm i
```
to download all the required dependencies for node backend.

**Step 4:** Add a `.env` file and add MongoDB connection URI & secret key.
```
JWT_SECRET = <your_secret_key>
PORT = 8000
MONGO_URI = mongodb+srv://<username>:<password>@cluster0.u2jyn7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV = DEVELOPMENT
CLIENT_URL = "Your frontend server URL"
```
Replace `<username>` and `<password>` with your MongoDB credentials.

---

## Test users credentials

- **Role: student**
    - email: student@test.com
    - password: student

- **Role: staff**
    - email: xyz@gmail.com
    - password: xyz

- **Role: management**
    - email: john@test.com
    - password: john

- **Role: admin**
    - email: abc@gmail.com
    - password: abc

---

**Step 5:** Setup is ready to launch. Run:
```sh
npm start
```
to start the backend server.

---

For more details, see the code and comments in each file.



