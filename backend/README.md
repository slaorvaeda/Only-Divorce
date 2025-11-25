# Only Divorce Backend API

Backend API server for the Only Divorce support platform.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```env
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/onlydivorce
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start MongoDB:**
   - Make sure MongoDB is running locally, or
   - Use MongoDB Atlas and update `MONGODB_URI` in `.env`

4. **Run the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone number
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Topics
- `GET /api/topics` - Get all support topics
- `GET /api/topics/:id` - Get topic by ID

### Groups
- `GET /api/groups` - Get all groups (with optional topic filter)
- `GET /api/groups/my-groups` - Get user's groups
- `POST /api/groups/:groupId/join` - Join a group
- `POST /api/groups/:groupId/leave` - Leave a group

### Sessions
- `GET /api/sessions/my-sessions` - Get user's sessions
- `GET /api/sessions/upcoming` - Get upcoming sessions

### Messages
- `GET /api/messages` - Get messages (with optional filters)
- `POST /api/messages` - Send a message

### User
- `GET /api/users/dashboard` - Get dashboard stats
- `PUT /api/users/topics` - Update selected topics

### Moderator
- `GET /api/moderator/dashboard` - Get moderator dashboard stats
- `GET /api/moderator/groups` - Get moderator's groups
- `POST /api/moderator/groups` - Create a new group

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard stats
- `GET /api/admin/users` - Get all users
- `GET /api/admin/moderators` - Get all moderators
- `POST /api/admin/moderators` - Create a moderator
- `PUT /api/admin/users/:userId/status` - Update user status

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Database Models

- **User**: User accounts with OTP authentication
- **Group**: Support groups organized by topic
- **Session**: Scheduled support sessions
- **Message**: Chat messages between users/moderators

## Development Notes

- OTP is logged to console in development mode
- In production, integrate with Twilio for SMS OTP
- Update JWT_SECRET in production
- Enable CORS for your frontend domain

