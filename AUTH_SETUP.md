# Authentication Setup Guide

This guide explains how to set up and use the authentication system for both frontend and backend.

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database:**
   ```sql
   CREATE DATABASE special_graphics;
   ```

4. **Configure environment variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_NAME=special_graphics
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   SYNC_DB=true
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

2. **Configure environment variables (optional):**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user (rate limited: 5 attempts per 15 minutes)
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh JWT token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

## 🔐 Authentication Flow

### Registration Flow

1. User fills out the sign-up form (name, email, password)
2. Frontend validates password requirements:
   - Minimum 6 characters
   - At least 1 uppercase letter
   - At least 1 lowercase letter
   - At least 1 number
3. Frontend sends POST request to `/api/auth/register`
4. Backend validates input, hashes password, creates user
5. Backend returns JWT token and user data
6. Frontend stores token in localStorage and redirects to home page

### Login Flow

1. User enters email and password
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates credentials
4. Backend returns JWT token and user data
5. Frontend stores token in localStorage and redirects to home page

### Token Management

- Tokens are stored in `localStorage` as `token`
- User data is stored in `localStorage` as `user`
- Tokens are automatically included in API requests via Authorization header
- Tokens expire after 7 days (configurable via `JWT_EXPIRE`)

## 🛠️ Features

### Frontend Features

- ✅ Form validation with real-time feedback
- ✅ Password strength indicator
- ✅ Loading states during API calls
- ✅ Error message display
- ✅ Automatic token management
- ✅ User state management via React Context
- ✅ Protected routes support (ready for implementation)

### Backend Features

- ✅ JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Input validation with express-validator
- ✅ Rate limiting on login (5 attempts per 15 minutes)
- ✅ CORS protection
- ✅ Security headers with Helmet
- ✅ Error handling middleware

## 📝 Usage Examples

### Using Auth Context in Components

```tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Making Authenticated API Requests

```tsx
import { authApi } from '@/lib/api';

// The token is automatically included in requests
const response = await authApi.getCurrentUser();
if (response.success) {
  console.log('User:', response.data);
}
```

## 🔒 Security Features

1. **Password Requirements:**
   - Minimum 6 characters
   - Must contain uppercase, lowercase, and number
   - Passwords are hashed using bcryptjs (12 rounds)

2. **Rate Limiting:**
   - Login endpoint limited to 5 attempts per 15 minutes per IP

3. **Token Security:**
   - Tokens stored in localStorage (consider httpOnly cookies for production)
   - Tokens expire after 7 days
   - Tokens verified on each protected request

4. **CORS Protection:**
   - Backend only accepts requests from configured frontend URL

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error:**
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if database exists: `CREATE DATABASE special_graphics;`

**Port Already in Use:**
- Change `PORT` in `.env` file
- Or stop the process using port 5000

**CORS Errors:**
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check browser console for specific CORS error messages

### Frontend Issues

**API Connection Error:**
- Verify backend server is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for network errors

**Token Not Persisting:**
- Check browser localStorage in DevTools
- Verify no browser extensions blocking localStorage
- Check for console errors

**Form Validation Not Working:**
- Check browser console for JavaScript errors
- Verify all required fields are filled
- Check password meets all requirements

## 📦 Dependencies

### Backend
- express
- sequelize
- pg (PostgreSQL client)
- bcryptjs
- jsonwebtoken
- express-validator
- cors
- helmet
- morgan
- compression

### Frontend
- next
- react
- react-dom
- lucide-react (for icons)

## 🎯 Next Steps

1. **Add Protected Routes:**
   - Create middleware to check authentication
   - Redirect unauthenticated users to login page

2. **Add Password Reset:**
   - Implement forgot password functionality
   - Add email verification

3. **Enhance Security:**
   - Consider using httpOnly cookies instead of localStorage
   - Add refresh token rotation
   - Implement account lockout after failed attempts

4. **Add Social Login:**
   - Integrate Google OAuth
   - Integrate Facebook OAuth
   - Integrate Apple Sign In

