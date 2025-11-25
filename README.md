# Only Divorce - Full Stack Platform

A comprehensive divorce support platform with frontend and backend integration, featuring real-time OTP authentication, support group management, and automated deployment.

## 🚀 Features

### Frontend (Hostinger)
- **Beautiful UI** with Tailwind CSS
- **Mobile-responsive** design
- **Multi-language support** (English, Hindi, Tamil, Telugu, Kannada, Malayalam)
- **15 support topics** with interactive cards
- **Real-time authentication** integration
- **Complete legal compliance** pages

### Backend (Node.js/Express + MongoDB)
- **RESTful API** with comprehensive endpoints
- **Real OTP verification** via Twilio
- **JWT authentication** with role-based access
- **MongoDB integration** with Mongoose ODM
- **Support group management**
- **User role management** (User, Moderator, Admin)
- **Rate limiting** and security middleware

## 📁 Project Structure

```
onlydivorce/
├── 📄 Frontend Files
│   ├── index.html              # Main homepage
│   ├── dashboard.html          # User dashboard with topic selection
│   ├── privacy-policy.html     # Privacy policy
│   ├── terms-of-use.html       # Terms of use
│   ├── disclaimer.html         # Important disclaimers
│   ├── sitemap.html           # Site map
│   ├── refund-policy.html      # No refund policy
│   └── compliance.html         # Legal compliance
│
├── 🔧 Backend Files
│   ├── src/
│   │   ├── app.js             # Main Express application
│   │   ├── config/
│   │   │   └── database.js    # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js        # User schema
│   │   │   └── Group.js       # Support group schema
│   │   ├── routes/
│   │   │   ├── auth.js        # Authentication routes (OTP, login)
│   │   │   ├── users.js       # User management
│   │   │   ├── groups.js      # Support group operations
│   │   │   ├── moderator.js   # Moderator functionality
│   │   │   └── admin.js       # Admin panel
│   │   ├── middleware/
│   │   │   └── errorHandler.js # Global error handling
│   │   └── utils/
│   │       └── otp.js         # OTP generation and sending
│   ├── package.json           # Dependencies and scripts
│   ├── Dockerfile             # Container configuration
│   ├── cloudbuild.yaml        # Google Cloud Build config
│   └── .env.example           # Environment variables template
│
└── 📚 Documentation
    └── README.md              # This file
```

## 🛠 Backend Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB instance (local or MongoDB Atlas)
- Twilio account for OTP functionality
- Google Cloud account for deployment

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd onlydivorce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your actual values:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/onlydivorce
   JWT_SECRET=your-super-secret-jwt-key
   TWILIO_ACCOUNT_SID=your-twilio-sid
   TWILIO_AUTH_TOKEN=your-twilio-token
   TWILIO_PHONE_NUMBER=your-twilio-number
   ```

4. **Start MongoDB** (if using local)
   ```bash
   mongod
   ```

5. **Run the backend**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The backend will start on `http://localhost:5000`

## 🚀 Deployment

### Frontend Deployment (Hostinger)

1. **Upload files to Hostinger**
   - Connect to your Hostinger account via FTP/SFTP
   - Upload all HTML files to `public_html/` directory
   - Ensure `index.html` is in the root

2. **Configure domain**
   - Point `onlydivorce.in` to your Hostinger server
   - Enable SSL certificate for HTTPS

3. **Update API endpoints**
   - In the frontend HTML files, update API base URL to your deployed backend
   - Example: `https://your-backend-url.herokuapp.com/api/`

### Backend Deployment (Google Cloud Run)

1. **Google Cloud Setup**
   ```bash
   # Set your project
   gcloud config set project your-project-id

   # Enable required APIs
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

2. **Deploy to Cloud Run**
   ```bash
   # Build and deploy
   gcloud builds submit --config cloudbuild.yaml .

   # Or deploy directly
   gcloud run deploy onlydivorce-backend \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

3. **Set environment variables**
   ```bash
   gcloud run services update onlydivorce-backend \
     --set-env-vars NODE_ENV=production,JWT_SECRET=your-secret,FRONTEND_URL=https://onlydivorce.in
   ```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to mobile number
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/preferences` - Update user preferences

### Groups
- `GET /api/groups/available` - Get available groups
- `GET /api/groups/topics/:topic` - Get groups by topic
- `POST /api/groups/:groupId/join` - Join a group
- `POST /api/groups/:groupId/leave` - Leave a group
- `GET /api/groups/my-groups` - Get user's groups

### User Management
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:userId` - Get user by ID
- `PUT /api/users/:userId/status` - Update user status
- `DELETE /api/users/:userId` - Delete user (admin only)

### Moderator Features
- `GET /api/moderator/my-groups` - Get moderator's groups
- `PUT /api/moderator/groups/:groupId/status` - Update group status
- `GET /api/moderator/groups/:groupId/participants` - Get group participants

### Admin Panel
- `GET /api/admin/dashboard` - Get admin statistics
- `POST /api/admin/create-moderator` - Create moderator account
- `GET /api/admin/moderators` - Get all moderators

## 🔒 Security Features

- **JWT Authentication** with role-based access control
- **Rate Limiting** (100 requests per 15 minutes per IP)
- **Input Validation** with express-validator
- **Password Hashing** for OTP storage
- **CORS Configuration** for cross-origin requests
- **Helmet.js** for security headers
- **Environment-based Configuration**

## 📱 Mobile Responsiveness

- **Tailwind CSS** responsive utilities
- **Touch-friendly** interface elements
- **Mobile-first** design approach
- **Optimized** for all screen sizes

## 🛠 Development

### Available Scripts
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
npm test       # Run tests (when implemented)
```

### Code Structure
- **MVC Pattern** with proper separation of concerns
- **Middleware-based** authentication and validation
- **Error Handling** with centralized error management
- **Environment Configuration** for different deployment stages

## 📋 Support Topics

1. 👩 Women Support
2. 👨 Mens Support
3. 💖 Emotional & Mental Support
4. 👶 Child Issues & Custody
5. 🌍 NRI Section
6. 💰 Alimony
7. 🏠 Maintenance
8. 🏡 Property
9. 💵 Cash
10. 💍 Gold
11. 🚫 Domestic Violence
12. 🛡️ Child Abuse
13. 💔 Extra Marital Issues

## 🔧 Configuration

### Environment Variables
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE_NUMBER` - Twilio phone number
- `FRONTEND_URL` - Frontend URL for CORS

## 🚦 Getting Started

1. **Set up environment variables**
2. **Start MongoDB**
3. **Run the backend**: `npm run dev`
4. **Deploy frontend to Hostinger**
5. **Deploy backend to Google Cloud Run**

The platform is now ready for users to register, verify via OTP, select support topics, and join groups!

## 📞 Support

For technical support or questions:
- Email: support@onlydivorce.in
- Documentation: This README

---

**Built with ❤️ for divorce support community**
