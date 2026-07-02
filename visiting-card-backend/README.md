# 🚀NexLink-Backend
> Backend API for **NexLink - Next Generation Digital Identity Platform**

NexLink allows users to create a professional digital identity card that can be shared with a single public URL.

# 📌 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Cloudinary
- Multer - image handling
- Nodemailer (OTP Verification)
- Google OAuth

# 🗄 Database Collections

## 1. Authentication Collection
Stores login-related information.

```javascript
{
    name,
    email,
    password,
    authProvider,
    googleId,
    picture,
    isEmailVerified,
}
```

## 2. Profile Collection
Stores the public digital visiting card.

```javascript
{
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
    others:[
        {platform,link}
    ],
    theme,
    layout,
    slug,
    isPublic,
    userType
}
```

# 🔐 Authentication System
NexLink supports two authentication methods.

## Custom Authentication
- Register
- Login
- JWT Authentication
- bcrypt Password Hashing
- Email OTP Verification

## Google Authentication
- Continue with Google
- Google OAuth
- No Password Required

# 🔄 Authentication Flow

## Custom User
```
Register
↓
Generate OTP
↓
Send Email
↓
Verify OTP
↓
Account Created
↓
JWT Generated
↓
Dashboard
```

## Google User
```
Continue with Google
↓
Google Verification
↓
JWT Generated
↓
Dashboard
```

# 📡 API Endpoints

Base URL
```
http://localhost:5000/
```

# 🔐 Authentication APIs

## Register
Creates a new user.

POST
```
/auth/register
```

## Verify OTP
Verifies email.

POST
```
/auth/verify-otp
```

## Google Login
Authenticates Google user.

POST
```
/auth/google
```

## Logged-in User
Returns logged-in user details using JWT in Local Storage.

POST
```
/auth/me
```

## Delete Account
Deletes authenticated account.

DELETE
```
/auth/delete
```

# 👤 Profile APIs

## Create Profile
Creates Digital Visiting Card.

POST
```
/profile/create
```

## Update Profile
Update anything like does it Change visibility

PUT
```
/profile/update/:id
```

## Delete Profile
Delete the Identity Card

DELETE
```
/profile/delete/:id
```

# ☁ Upload APIs

## Upload Image
Uploads profile image to Cloudinary.

POST
```
/profile/upload
```

Returns
```
Image URL
```

# ⭐ Premium APIs
(Currently Placeholder)

GET
```
/premium
```

Returns
```
Coming Soon
```

# 🎨 Supported Themes
- Light
- Dark

# 🎨 Planned Layouts
- Minimal
- Modern
- Bold

# 🔗 Public URL Format

```
/profile/:slug
```

# 🖼 Image Storage
Profile images are **not stored in MongoDB**.

Workflow
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

Only the Cloudinary URL is stored.

# 📧 Email System
Emails are sent from backend.

Used for
- OTP Verification
- Welcome Email

# 🔒 Security Features
- JWT Authentication
- bcrypt Password Hashing
- Protected Routes
- Email Verification
- Google OAuth
- Input Validation
- Slug-based Public URLs

# 📦 Environment Variables

```
PORT=
MONGODB_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
EMAIL_USER=
EMAIL_PASS=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

# 👨‍💻 Developer
**Niket**
Full Stack Developer | MERN Stack Enthusiast