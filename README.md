# Special Graphics

A full-stack application with Next.js frontend and Express.js backend using PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=special_graphics
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

4. Make sure PostgreSQL is running and create the database:
```sql
CREATE DATABASE special_graphics;
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the root directory (if not already there):
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Environment Variables

**Frontend** (optional - defaults are set):
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend** (required):
Create a `.env` file in the `backend` directory:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=special_graphics
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

## API Connection

The frontend is configured to connect to the backend API at `http://localhost:5000/api`. The connection is handled through:

- **API Base URL**: `src/lib/api.ts` - Contains all API utility functions
- **Auth Hook**: `src/hooks/useAuth.ts` - Manages authentication state
- **CORS**: Backend is configured to accept requests from `http://localhost:3000`

### Available API Endpoints

**Authentication** (`/api/auth`):
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)
- `PUT /profile` - Update user profile (protected)

**Inspirations** (`/api/inspirations`):
- `GET /` - Get all inspirations
- `GET /search` - Search inspirations
- `GET /:id` - Get inspiration by ID
- `POST /:id/like` - Toggle like (protected)

**Designs** (`/api/designs`):
- `GET /` - Get all designs (protected)
- `GET /:id` - Get design by ID (protected)
- `POST /` - Create design (protected)
- `PUT /:id` - Update design (protected)
- `DELETE /:id` - Delete design (protected)

## Project Structure

```
.
├── backend/          # Express.js backend with PostgreSQL
│   ├── src/
│   │   ├── config/   # Database configuration
│   │   ├── controllers/
│   │   ├── entities/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   └── package.json
├── src/              # Next.js frontend
│   ├── app/
│   ├── components/
│   └── lib/
└── package.json
```

## Technologies

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript, TypeORM, PostgreSQL
- **Database**: PostgreSQL

