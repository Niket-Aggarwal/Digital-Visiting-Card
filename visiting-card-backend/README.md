# 🚀 NexLink Backend
> Backend for **NexLink — Next Generation Digital Identity Platform**

NexLink enables users to create a professional digital identity card that can be shared with a single public URL. It provides secure authentication, profile management, email verification, and Google Sign-In.

# 🚀 Features
- Custom Authentication
- Google Authentication
- JWT Session Management
- OTP Verification
- Password Reset
- Account Deletion
- Digital Identity Card
- Cloudinary Image Upload
- Public Portfolio via Slug
- Email Notifications
- Secure Password Hashing

# 📌 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Nodemailer
- Google OAuth
- Cloudinary
- Multer
- Validator.js

# 🗄 Database Collections

## 1. Authentication Collection
Stores authentication-related information.

```javascript
{
    name,
    email,
    password,
    authProvider,
    googleId,
    picture
}
```

## 2. Verification Collection
Temporary collection used during signup and password reset.

```javascript
{
    name,
    email,
    password,
    otp,
    otpExpiry
}
```

## 3. Card Collection
Stores the user's public digital identity.

```javascript
{
    authId,
    name,
    headline,
    bio,
    email,
    phno,
    image,
    github,
    linkedin,
    instagram,
    facebook,
    telegram,
    others: [ { platform, link } ],
    theme,
    layout,
    slug,
    isPublic,
    userType
}
```

# 🔐 Authentication
NexLink supports two authentication methods.

## Custom Authentication
- Email Registration
- Email OTP Verification
- Secure Login
- JWT Authentication
- Password Hashing (bcrypt)

## Google Authentication
- Continue with Google
- Google OAuth
- Automatic Account Creation
- JWT Authentication

# 🔄 Authentication Flow

## Custom User
```
Signup
   ↓
Validate Details
   ↓
Generate OTP
   ↓
Send Verification Email
   ↓
Verify OTP
   ↓
Create Account
   ↓
Generate JWT
   ↓
Dashboard
```

## Google User
```
Continue with Google
        ↓
Google Verification
        ↓
Generate JWT
        ↓
Dashboard
```

## Reset Password
```
Enter Email
      ↓
Generate OTP
      ↓
Send Email
      ↓
Verify OTP
      ↓
New Password
      ↓
Update Password
```

# 📡 API Endpoints
## 🔐 Authentication APIs

### Google Login
Authenticate using Google OAuth.

```
POST /auth/google
```

### Verify

Handles:
- Custom Signup Verification
- Custom Login Verification

```
POST /auth/verify
```

### Register
Creates account after successful OTP verification.

```
POST /auth/register
```

### Active Session
Returns authenticated user details using JWT.

```
GET /auth/me
```

### Forgot Password
Sends OTP for password reset.

```
POST /auth/forget
```

### Verify Reset OTP
Verifies OTP before allowing password update.

```
POST /auth/otpverify
```

### Reset Password
Updates account password.

```
PUT /auth/passupdate
```

### Delete Account
Deletes authentication record and linked profile.

```
DELETE /auth/delete
```

## 👤 Profile APIs

### Create Profile
Creates user's digital identity card.

```
POST /profile/create
```

## Update Profile
Updates profile information.

```
PUT /profile/update
```

## Delete Profile
Deletes digital identity card.

```
DELETE /profile/delete
```

## Public Profile
Returns public profile using unique slug.

```
GET /profile/:slug
```

# ☁ Image Upload
Profile images are uploaded to Cloudinary.

```
Frontend
      ↓
Backend
      ↓
Cloudinary
      ↓
Image URL
      ↓
MongoDB
```

Only the Cloudinary URL is stored in the database.

# 📧 Email System
The backend automatically sends emails for:
- Email Verification OTP
- Incorrect Password Alert
- Successful Login
- Password Updated
- Account Deleted

# 🔒 Security Features
- JWT Authentication
- Protected Routes
- Google OAuth Verification
- Email OTP Verification
- bcrypt Password Hashing
- Input Validation
- Slug-based Public Profiles
- One Account → One Card Relationship

# 🎨 Themes
- Light
- Dark

# 📐 Layouts
- Modern
- Minimal
- Bold 

# ⭐ User Types
- Free
- Premium *(Coming Soon)*

# 🌐 Public URL

```
/profile/:slug
```

# 📦 Environment Variables
```env
PORT=

MONGODB_URI=

JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

EMAIL_USER=
EMAIL_PASS=
MAIL_IMG=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

# 👨‍💻 Developer
**Niket**
Full Stack MERN Developer

> **NexLink — One Identity. Infinite Connections.**