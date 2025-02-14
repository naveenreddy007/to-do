# MongoDB Todo App - Learning Project

## Setup Guide

### 1. MongoDB Cloud Setup
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create shared cluster
3. Add IP to Network Access (0.0.0.0/0 for anywhere)
4. Create database user
5. Get connection URI from "Connect" button

### 2. Local Setup
```bash
# Install dependencies
cd backend && npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your credentials
nano .env

# Start server
npm start
```

### 3. Key Concepts
- **CRUD Operations**: 
  - Create: POST /todos
  - Read: GET /todos 
  - Update: PUT /todos/:id
  - Delete: DELETE /todos/:id
  
- **Middleware**:
  - body-parser: Parse JSON requests
  - cors: Enable cross-origin requests
  - dotenv: Environment variable management

## Learning Resources
- [MongoDB Basics](https://www.mongodb.com/docs/manual/crud/)
- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)