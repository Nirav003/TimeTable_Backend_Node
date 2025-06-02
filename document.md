# API Endpoints Documentation

This document provides details for all major CRUD API endpoints in the TimeTable_Backend_Node project, including method, path, required data, description, and typical status codes.

---

## User APIs

### Register User
- **POST** `/api/v1/user/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword",
    "role": "student" // or staff, management, admin
  }
  ```
- **Description:** Register a new user.
- **Status Codes:**  
  `201 Created` – Success  
  `400 Bad Request` – Missing/invalid data  
  `409 Conflict` – Email already exists

---

### Login User
- **POST** `/api/v1/user/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Description:** Authenticate user and return JWT token.
- **Status Codes:**  
  `200 OK` – Success  
  `401 Unauthorized` – Invalid credentials

---

## Lecture APIs

### Create Lecture
- **POST** `/api/v1/college/lectures`
- **Body:**
  ```json
  {
    "subject": "Maths",
    "professor": "professorId",
    "room": "roomId",
    "timeSlot": "timeSlotId",
    "division": "divisionId"
  }
  ```
- **Description:** Create a new lecture.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

### Get All Lectures
- **GET** `/api/v1/college/lectures`
- **Description:** Retrieve all lectures.
- **Status Codes:**  
  `200 OK`

### Update Lecture
- **PUT** `/api/v1/college/lectures/:id`
- **Body:** (fields to update)
- **Description:** Update a lecture by ID.
- **Status Codes:**  
  `200 OK`  
  `404 Not Found`

### Delete Lecture
- **DELETE** `/api/v1/college/lectures/:id`
- **Description:** Delete a lecture by ID.
- **Status Codes:**  
  `200 OK`  
  `404 Not Found`

---

## Room APIs

### Create Room
- **POST** `/api/v1/college/rooms`
- **Body:**
  ```json
  {
    "name": "Room 101",
    "capacity": 40
  }
  ```
- **Description:** Add a new room.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

### Get All Rooms
- **GET** `/api/v1/college/rooms`
- **Description:** Retrieve all rooms.
- **Status Codes:**  
  `200 OK`

### Update Room
- **PUT** `/api/v1/college/rooms/:id`
- **Body:** (fields to update)
- **Description:** Update a room by ID.
- **Status Codes:**  
  `200 OK`  
  `404 Not Found`

### Delete Room
- **DELETE** `/api/v1/college/rooms/:id`
- **Description:** Delete a room by ID.
- **Status Codes:**  
  `200 OK`  
  `404 Not Found`

---

## Stream APIs

### Create Stream
- **POST** `/api/v1/college/stream`
- **Body:**
  ```json
  {
    "name": "Science"
  }
  ```
- **Description:** Add a new stream.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

### Get All Streams
- **GET** `/api/v1/college/stream`
- **Description:** Retrieve all streams.
- **Status Codes:**  
  `200 OK`

### Update Stream
- **PUT** `/api/v1/college/stream/:id`
- **Body:** (fields to update)
- **Description:** Update a stream by ID.
- **Status Codes:**  
  `200 OK`  
  `404 Not Found`

### Delete Stream
- **DELETE** `/api/v1/college/stream/:id`
- **Description:** Delete a stream by ID.
- **Status Codes:**  
  `200 OK`  
  `404 Not Found`

---

## Division APIs

### Create Division
- **POST** `/api/v1/college/division`
- **Body:**
  ```json
  {
    "name": "A",
    "streamId": "streamId"
  }
  ```
- **Description:** Add a new division.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

### Get All Divisions
- **GET** `/api/v1/college/division`
- **Description:** Retrieve all divisions.
- **Status Codes:**  
  `200 OK`

### Update Division
- **PUT** `/api/v1/college/division/:id`
- **Body:** (fields to update)
- **Description:** Update a division by ID.
- **Status Codes:**  
  `200 OK`  
  `404 Not Found`

### Delete Division
- **DELETE** `/api/v1/college/division/:id`
- **Description:** Delete a division by ID.
- **Status Codes:**  
  `200 OK`  
  `404 Not Found`

---

## Timetable APIs

### Get Timetable
- **GET** `/api/v1/college/calendar?divisionId=divisionId`
- **Description:** Get timetable for a division.
- **Status Codes:**  
  `200 OK`  
  `404 Not Found`

### Create/Update Timetable
- **POST** `/api/v1/college/schedule`
- **Body:** (timetable data as per schema)
- **Description:** Create or update a timetable.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

---

## Shift APIs

### Create Shift
- **POST** `/api/v1/college/shift`
- **Body:**
  ```json
  {
    "name": "Morning",
    "startTime": "08:00",
    "endTime": "12:00"
  }
  ```
- **Description:** Add a new shift.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

### Get All Shifts
- **GET** `/api/v1/college/shift`
- **Description:** Retrieve all shifts.
- **Status Codes:**  
  `200 OK`

---

## TimeSlot APIs

### Create TimeSlot
- **POST** `/api/v1/college/timeslot`
- **Body:**
  ```json
  {
    "startTime": "09:00",
    "endTime": "10:00"
  }
  ```
- **Description:** Add a new time slot.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

### Get All TimeSlots
- **GET** `/api/v1/college/timeslot`
- **Description:** Retrieve all time slots.
- **Status Codes:**  
  `200 OK`

---

## Committee APIs

### Create Committee
- **POST** `/api/v1/management/committee`
- **Body:**
  ```json
  {
    "name": "Discipline Committee"
  }
  ```
- **Description:** Add a new committee.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

### Get All Committees
- **GET** `/api/v1/management/committee`
- **Description:** Retrieve all committees.
- **Status Codes:**  
  `200 OK`

---

## Meeting APIs

### Create Meeting
- **POST** `/api/v1/meeting`
- **Body:** (meeting data as per schema)
- **Description:** Schedule a new meeting.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

### Get All Meetings
- **GET** `/api/v1/meeting`
- **Description:** Retrieve all meetings.
- **Status Codes:**  
  `200 OK`

---

## Max Lectures Per Day APIs

### Set Max Lectures
- **POST** `/api/v1/max-lec`
- **Body:**
  ```json
  {
    "professorId": "profId",
    "maxLectures": 4
  }
  ```
- **Description:** Set the maximum lectures per day for a professor.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

### Get Max Lectures
- **GET** `/api/v1/max-lec`
- **Description:** Retrieve max lectures per day settings.
- **Status Codes:**  
  `200 OK`

---

## Mappings

### Stream-Subject Mapping
- **POST** `/api/v1/college/mapping/stream-subject`
- **Body:**
  ```json
  {
    "streamId": "streamId",
    "subjectId": "subjectId"
  }
  ```
- **Description:** Map a subject to a stream.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

### Professor-Stream Mapping
- **POST** `/api/v1/college/mapping/professor-stream`
- **Body:**
  ```json
  {
    "professorId": "profId",
    "streamId": "streamId"
  }
  ```
- **Description:** Map a professor to a stream.
- **Status Codes:**  
  `201 Created`  
  `400 Bad Request`

---

> **Note:**  
> Most endpoints require authentication via JWT token in the `Authorization` header.  
> For more details, refer to the controller code or Postman collection.
