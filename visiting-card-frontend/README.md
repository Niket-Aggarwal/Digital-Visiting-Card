# 🚀 NexLink Frontend
> Frontend for **NexLink — Next Generation Digital Identity Platform**

NexLink allows users to build and share their professional digital identity through a modern, responsive, and customizable digital visiting card. The frontend provides an intuitive interface for authentication, profile management, layout customization, and public profile sharing.

# 🚀 Features
- Responsive User Interface
- Custom Authentication Pages
- Google Sign-In
- Dashboard
- Multi-Step Profile Management
- Digital Card Preview
- Multiple Card Layouts
- Theme Selection
- Public Profile Viewer
- Feedback Form
- Fully Responsive Design

# 📌 Tech Stack
- React.js
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Context API
- React Icons
- React Hot Toast

# 🖥 Pages

## Home
Landing page introducing NexLink.

Features:
- Hero Section
- Feature Highlights
- Layout Showcase
- FAQ
- Feedback
- Footer

## Authentication

### Login
- Email Login
- Google Login

### Register
- Email Registration
- OTP Verification

### Forgot Password
- OTP Verification
- New Password

## Dashboard
Displays account overview.

Sections
- Profile Information
- Identity Information
- Premium Status
- Danger Zone

## Manage Identity
Multi-step profile creation.

### Step 1
Basic Details

- Name
- Email
- Headline
- Bio
- Unique Slug

### Step 2
Image & Contact

- Profile Image
- Phone

### Step 3
Social Accounts

- GitHub
- LinkedIn
- Instagram
- Facebook
- Telegram
- Custom Links

### Step 4
Finish

- Theme
- Layout
- Visibility

## Layout Preview
Users can preview every available design before selecting.

Features
- Live Preview
- Desktop View
- Tablet View
- Mobile View
- Full Screen Preview

## Public Profile
Displays user's public digital identity.

Supports
- Light Theme
- Dark Theme

Layouts
- Minimal
- Modern
- Bold

# 📱 Responsive Design
Optimized for
- Mobile
- Tablet
- Laptop
- Desktop

# 🔄 Frontend Flow

## Authentication
```
Login/Register
      ↓
JWT Token
      ↓
Dashboard
```

## Profile Creation
```
Basic Details
      ↓
Uploads
      ↓
Social Links
      ↓
Finish
      ↓
Public Profile
```

## Layout Preview
```
Choose Layout
      ↓
Preview
      ↓
Desktop / Tablet / Mobile
```

# 🌐 Routing
```
/
├── /login
├── /register
├── /forget
├── /dashboard
├── /manage
├── /layout
├── /feedback
└── /:slug
```

# 🎯 Highlights
- Modern UI
- Clean User Experience
- Responsive Components
- Reusable Architecture
- Beginner Friendly Structure
- Easy Backend Integration

# 👨‍💻 Developer
**Niket**
Full Stack MERN Developer

> **NexLink — One Identity. Infinite Connections.**