# Project Setup & Run Guide

## I. Prerequisites

1. **Node.js**: Install from [Node.js](https://nodejs.org/).
2. **Docker**: Install from [Docker](https://www.docker.com/get-started).

## II. Environment Setup

### 1. Configure Environment Files

#### 1.1 **Database** (`\src\.env`):

```env
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=db
```

#### 1.2 **Backend** (`\src\backend\.env`):

```env
JWT_SECRET=ricourse
SIGN_UP_SECRET=ricourse
DATABASE_URL="postgresql://username:password@localhost:5432/db"
CLIENT_URL=http://localhost:3000
```

#### 1.3 **Frontend** (`\src\frontend\.env`):

```env
JWT_SECRET=ricourse
SIGN_UP_SECRET=ricourse
NEXT_PUBLIC_API_URL=http://localhost:3123
CYPRESS_BASE_URL=http://localhost:3000
```

## III. Running the Project

### 2.1 Start PostgreSQL with Docker

Run the following command to start the PostgreSQL container:

```bash
\src> docker-compose up -d
```

Next, set up the database using Prisma:

```bash
\src> cd backend
\src\backend> npx prisma db push
\src\backend> npx prisma db seed
```

### 2.2 Start the Backend

1. Install backend dependencies:

   ```bash
   \src> cd backend
   \src\backend> npm install
   ```

2. Run the backend in development mode:

   ```bash
   \src\backend> npm run start:dev
   ```

   Or in production mode:

   ```bash
   \src\backend> npm run start
   ```

### 2.3 Start the Frontend

1. Install frontend dependencies:

   ```bash
   \src> cd frontend
   \src\frontend> npm install
   ```

2. Run the frontend in development mode:

   ```bash
   \src\frontend> npm run dev
   ```

   Or in production mode:

   ```bash
   \src>frontend> npm run build
   \src>frontend> npm run start
   ```

The frontend should be available at [http://localhost:3000](http://localhost:3000), and the backend at [http://localhost:3123](http://localhost:3123).

## IV. Testing

### 3.1 Frontend Unit Tests

Run the unit tests for the frontend with coverage:

```bash
\src\frontend> npm test -- --coverage
```

### 3.2 End-to-End Testing

#### Run tests in headless mode:

```bash
\src\frontend> npx cypress run
```

#### Open Cypress UI for interactive testing:

```bash
\src\frontend> npx cypress open
```

## V. Exiting the Project

1. **Stop the Running Services:**

   Use `Ctrl + C` in your terminal to terminate the active processes.

2. **Shut Down Docker Containers:**

   To stop and remove the PostgreSQL container, run:

   ```bash
   \src> docker-compose down
   ```

## VI. Notes

- Ensure that the configuration in the `.env` file is consistent and correct.
- Ensure that both Docker and PostgreSQL are running before starting the backend and frontend.
- Ensure ports 3000 and 3123 are available.
- If there is an error while running Docker, try changing the port of database to avoid conflicts.
