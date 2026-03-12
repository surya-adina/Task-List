# Task List

A full-stack task management web app built with React, Node.js, Express, and MongoDB. Create, search, update, and delete your tasks — all synced with a cloud database.

**Live Demo:** https://task-list-surya-adina.vercel.app

---

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Search/filter tasks in real time
- Data persisted in MongoDB Atlas
- Responsive layout with clean UI

---

## Tech Stack

| Layer | Technology |
|------------|------------------------------|
| Frontend | React, Material UI, Bootstrap |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose) |
| Deployment | Vercel (frontend + backend) |

---

## Project Structure

```
Task-List/
├── client/         # React frontend
│   └── src/
│       ├── components/
│       │   ├── DisplayTasks/
│       │   └── SubmitTask/
│       ├── images/
│       ├── App.js
│       └── App.css
└── server/         # Node/Express backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── index.js
    └── vercel.json
```

---

## Getting Started (Local)

### Prerequisites
- Node.js v16+
- MongoDB Atlas account (or local MongoDB)

### Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```
DB_CONNECT=mongodb+srv://<user>:<password>@cluster0.mongodb.net/tasklist
```

```bash
npm start
```

Server runs on `http://localhost:5500`

### Frontend

```bash
cd client
npm install
```

Create a `.env` file in `/client`:

```
REACT_APP_BASE_URL=http://localhost:5500/api/item
```

```bash
npm start
```

App runs on `http://localhost:3000`

---

## Deployment

Both frontend and backend are deployed on **Vercel**:

- Frontend: https://task-list-surya-adina.vercel.app
- Backend API: https://task-list-server-surya-adina.vercel.app/api/item

---

## API Endpoints

| Method | Endpoint | Description |
|--------|------------------|---------------------|
| GET | `/api/item` | Get all tasks |
| POST | `/api/item` | Create a new task |
| PUT | `/api/item/:id` | Update a task |
| DELETE | `/api/item/:id` | Delete a task |
| GET | `/api/item/:id` | Get a single task |
