# Admin Panel Connection Fix

## Issue
The admin panel at `https://special-graphics-official.vercel.app/adminpanel` was not connected, meaning it couldn't communicate with the backend API.

## Root Causes
1. **Missing Environment Variables** - The frontend didn't have `NEXT_PUBLIC_API_URL` configured
2. **Missing Authentication** - The admin panel wasn't checking user authentication or roles
3. **Backend Not Configured** - The backend `.env` file was missing

## Solutions Implemented

### 1. Frontend Configuration
Created `.env.local` file with the API URL:
```env
NEXT_PUBLIC_API_URL=https://special-graphics-api.vercel.app/api
```

This tells the frontend where to find the backend API.

### 2. Backend Configuration
Created `backend/.env` file with proper settings:
```env
PORT=5000
NODE_ENV=production
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=https://special-graphics-official.vercel.app
SYNC_DB=true
```

### 3. Authentication Protection
Added authentication to the admin panel:
- Created `src/components/admin/AdminProtected.tsx` - A wrapper component that checks if the user is:
  - Authenticated (has a valid token and user data)
  - Has proper authorization (admin or moderator role)
  - Redirects to login if not authenticated
  - Redirects to home if not authorized

- Updated `src/app/adminpanel/layout.tsx` to wrap the admin panel with the `AdminProtected` component

### 4. Updated Components
- **AdminHeader.tsx** - Now displays the actual logged-in user's name and email, and handles logout properly
- **ConditionalLayout.tsx** - Updated to wrap admin routes in `AuthProvider` so authentication works

## What Still Needs to Be Done

### Before Deploying to Vercel:
1. **Update Backend URL** - Change `NEXT_PUBLIC_API_URL` to your actual backend API URL when it's deployed
   - Currently set to: `https://special-graphics-api.vercel.app/api`
   - Should point to wherever your backend is hosted

2. **Backend Deployment** - Deploy the backend to a production server or Vercel
   - The backend needs to be running and accessible
   - Update the `FRONTEND_URL` in backend `.env` if needed

3. **Database Setup** - Ensure the database is properly set up:
   - If using PostgreSQL, create the database and configure connection
   - If using SQLite, the database will be created automatically
   - Current config uses SQLite for simplicity

4. **JWT Secret** - Replace the JWT secret with a strong, secure key in production:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

5. **Admin User Creation** - You need to create an admin user:
   - Register a new user through `/auth` page
   - Update their role to 'admin' or 'moderator' in the database
   - Or modify the User model to have a seeding script

### Environment Variables in Vercel:

For the **frontend** (`special-graphics-official`):
```
NEXT_PUBLIC_API_URL=https://your-backend-domain/api
```

For the **backend**:
```
PORT=5000
NODE_ENV=production
DB_NAME=special_graphics
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=your_db_host
DB_PORT=5432
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=https://special-graphics-official.vercel.app
SYNC_DB=true
```

Or if using SQLite:
```
PORT=5000
NODE_ENV=production
DB_DIALECT=sqlite
DB_STORAGE=/tmp/database.sqlite
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=https://special-graphics-official.vercel.app
SYNC_DB=true
```

## Testing the Admin Panel

1. Go to `https://special-graphics-official.vercel.app/auth`
2. Login with an admin account
3. Navigate to `/adminpanel`
4. You should see the admin dashboard

If you see a loading spinner, the auth system is loading. If redirected to `/auth`, you're not authenticated. If redirected to `/`, your user doesn't have admin role.

## Architecture

```
Frontend (Next.js)
├── Auth System (Context + Provider)
├── Admin Routes (Protected)
│   ├── AdminProtected Component (Auth Check)
│   ├── AdminHeader (User Info & Logout)
│   └── AdminSidebar (Navigation)
└── API Client (lib/api.ts)
    └── Backend API (Express.js)
        ├── Auth Endpoints
        ├── Users Endpoints
        ├── Designs Endpoints
        └── Database (PostgreSQL or SQLite)
```

## Files Modified/Created
- ✅ `.env.local` - Created with API URL
- ✅ `backend/.env` - Created with backend config
- ✅ `src/components/admin/AdminProtected.tsx` - Created for auth protection
- ✅ `src/components/admin/AdminHeader.tsx` - Updated with auth integration
- ✅ `src/app/adminpanel/layout.tsx` - Updated with protection wrapper
- ✅ `src/components/ConditionalLayout.tsx` - Updated to include AuthProvider for admin routes
