# 🔐 Admin Dashboard Setup Guide - Trimurti Classes

## Overview

This guide will help you set up and access the Admin Dashboard for Trimurti Classes. The admin panel allows the owner (Shailesh Sutawane) to manage admissions, view contact inquiries, and monitor all website activities.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Admin Credentials](#admin-credentials)
4. [First-Time Setup](#first-time-setup)
5. [Accessing the Dashboard](#accessing-the-dashboard)
6. [Dashboard Features](#dashboard-features)
7. [Security Best Practices](#security-best-practices)
8. [API Endpoints](#api-endpoints)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before setting up the admin dashboard, ensure you have:

- ✅ Backend server running (Node.js + Express)
- ✅ MongoDB database connected
- ✅ All dependencies installed (`npm install`)
- ✅ `.env` file created in the backend folder

---

## Environment Variables Setup

### Step 1: Locate or Create `.env` File

Navigate to your backend folder:
```bash
cd backend
```

If `.env` doesn't exist, create it:
```bash
touch .env
```

### Step 2: Add Required Variables

Open `.env` and add the following admin credentials:

```env
# ==============================================
# ADMIN CREDENTIALS
# ==============================================
ADMIN_EMAIL=shaileshsutawane@gmail.com
ADMIN_PASSWORD=YourSecurePassword123!

# ==============================================
# JWT CONFIGURATION
# ==============================================
JWT_SECRET=your_jwt_secret_key_minimum_32_characters_long
JWT_EXPIRE=30d

# ==============================================
# DATABASE
# ==============================================
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/trimurti-classes

# ==============================================
# SERVER
# ==============================================
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# ==============================================
# EMAIL CONFIGURATION (Already configured)
# ==============================================
EMAIL_USER=shaileshsutawane@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
OWNER_EMAIL=shaileshsutawane@gmail.com
```

### Step 3: Generate Secure Values

#### Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Choose Strong Admin Password:
- Minimum 8 characters
- Include uppercase and lowercase letters
- Include numbers
- Include special characters
- Example: `Admin@Trimurti2024!`

---

## Admin Credentials

### Default Admin Account

**Email:** `shaileshsutawane@gmail.com`  
**Password:** Set in `.env` file as `ADMIN_PASSWORD`  
**Role:** Admin  
**Name:** Shailesh Sutawane

> ⚠️ **IMPORTANT:** Never commit the `.env` file to Git. It's already in `.gitignore`.

---

## First-Time Setup

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Verify Environment Variables

```bash
# Check if .env is loaded
node -e "require('dotenv').config(); console.log(process.env.ADMIN_EMAIL)"
```

You should see: `shaileshsutawane@gmail.com`

### Step 3: Start Backend Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected...
```

### Step 4: Test Admin Login (Optional)

Using curl or Postman:

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "shaileshsutawane@gmail.com",
    "password": "YourPassword"
  }'
```

Expected response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Shailesh Sutawane",
    "email": "shaileshsutawane@gmail.com",
    "role": "admin"
  }
}
```

---

## Accessing the Dashboard

### Development Environment

1. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Navigate to Admin Login:**
   ```
   http://localhost:5173/admin/login
   ```

3. **Login with Credentials:**
   - Email: `shaileshsutawane@gmail.com`
   - Password: Your password from `.env`

4. **Access Dashboard:**
   After successful login, you'll be redirected to:
   ```
   http://localhost:5173/admin/dashboard
   ```

### Production Environment

```
https://yourdomain.com/admin/login
```

---

## Dashboard Features

### 📊 Dashboard Overview

**Stats Display:**
- Total inquiries received
- New unread messages
- Admission requests
- Contact form submissions
- Weekly/monthly trends

**Quick Actions:**
- View all admissions
- View all contacts
- Mark as read/replied
- Delete inquiries

---

### 🎓 Admissions Management

**Path:** `/admin/admissions`

**Features:**
- View all admission inquiries
- Filter by:
  - Standard/Class
  - Medium (Gujarati/English)
  - Date range
  - Status
- Sort by date, status, or name
- Search by name, email, or phone
- View detailed information:
  - Student name
  - Email and phone
  - Standard and medium
  - Subjects interested in
  - Additional message
  - Submission date

**Actions:**
- Mark as read
- Mark as replied
- Mark as resolved
- Add notes
- Delete inquiry
- Bulk actions (select multiple)

---

### 📧 Contact Messages

**Path:** `/admin/contacts`

**Features:**
- View all contact form submissions
- Filter by:
  - Regarding (admission, fee, schedule, course, other)
  - Status (new, read, replied, resolved)
  - Date range
- Search functionality
- Pagination (20 items per page)

**Each Contact Shows:**
- Sender name
- Email and phone
- Subject
- Message content
- Inquiry type (regarding)
- Status
- Submission date
- Notes (if added)

**Actions:**
- Mark as read
- Mark as replied
- Mark as resolved
- Mark as spam
- Add internal notes
- Delete message
- Bulk operations

---

### 🔍 Individual Inquiry View

**Path:** `/admin/contacts/:id`

**Details Displayed:**
- Full contact information
- Complete message
- Preferred contact method
- All timestamps
- Status history
- Notes history

**Available Actions:**
- Update status
- Add/edit notes
- Send email (redirect to Gmail)
- Call directly (clickable phone)
- Delete inquiry

---

### 📈 Statistics & Reports

**Dashboard Stats:**
- Total contacts: All-time count
- New contacts: Unread messages
- Admission inquiries: Specific to admissions
- Recent activity: Last 7 days
- Status breakdown: Visual chart
- Inquiry type breakdown: Pie chart

---

## Security Best Practices

### 🔒 Password Security

1. **Use Strong Passwords:**
   - Minimum 12 characters
   - Mix of upper/lowercase, numbers, symbols
   - Avoid common words or patterns
   - Example: `Tm@2024$ecure!Pass`

2. **Change Password Regularly:**
   - Update every 3-6 months
   - Update in `.env` file
   - Restart server after changes

3. **Never Share Credentials:**
   - Keep `.env` file private
   - Don't email or message passwords
   - Don't store in version control

### 🛡️ Session Management

- **JWT Token Expiry:** 30 days (configurable)
- **Auto-logout:** After token expiration
- **Secure Storage:** Tokens stored in httpOnly cookies or localStorage (encrypted)

### 🔐 Access Control

- **Admin-Only Routes:** Protected by JWT authentication
- **Role-Based Access:** Only `role: 'admin'` can access
- **API Protection:** All admin endpoints require valid token

### 🚨 Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] Strong password set for `ADMIN_PASSWORD`
- [ ] Unique JWT secret (32+ characters)
- [ ] HTTPS enabled in production
- [ ] CORS configured to allow only your domain
- [ ] Regular backups of MongoDB database
- [ ] Server firewall configured
- [ ] Rate limiting enabled (optional)
- [ ] Login attempt monitoring (optional)

---

## API Endpoints

### Authentication

**Login**
```
POST /api/admin/login
Body: { email, password }
Response: { success, token, user }
```

**Logout**
```
POST /api/admin/logout
Headers: Authorization: Bearer {token}
Response: { success }
```

**Get Current User**
```
GET /api/admin/me
Headers: Authorization: Bearer {token}
Response: { success, data: user }
```

---

### Dashboard

**Get Stats**
```
GET /api/admin/dashboard/stats
Headers: Authorization: Bearer {token}
Response: { 
  success, 
  data: {
    totalContacts,
    newContacts,
    admissionInquiries,
    recentContacts,
    statusCounts,
    regardingCounts
  }
}
```

---

### Admissions

**Get All Admissions**
```
GET /api/admin/admissions?page=1&limit=20&status=new
Headers: Authorization: Bearer {token}
Response: { success, count, pagination, data }
```

---

### Contacts

**Get All Contacts**
```
GET /api/admin/contacts?page=1&limit=20
Headers: Authorization: Bearer {token}
Response: { success, count, pagination, data }
```

**Get Single Contact**
```
GET /api/admin/contacts/:id
Headers: Authorization: Bearer {token}
Response: { success, data }
```

**Update Contact**
```
PUT /api/admin/contacts/:id
Headers: Authorization: Bearer {token}
Body: { status: 'replied', notes: 'Called and discussed' }
Response: { success, data }
```

**Delete Contact**
```
DELETE /api/admin/contacts/:id
Headers: Authorization: Bearer {token}
Response: { success }
```

**Bulk Delete**
```
DELETE /api/admin/contacts/bulk
Headers: Authorization: Bearer {token}
Body: { ids: ['id1', 'id2', 'id3'] }
Response: { success, data: { deletedCount } }
```

**Bulk Update**
```
PUT /api/admin/contacts/bulk
Headers: Authorization: Bearer {token}
Body: { ids: ['id1', 'id2'], status: 'read' }
Response: { success, data: { modifiedCount } }
```

---

## Troubleshooting

### Problem: Cannot Login

**Error:** "Invalid credentials"

**Solutions:**
1. Check `.env` file exists in backend folder
2. Verify `ADMIN_EMAIL` matches exactly
3. Verify `ADMIN_PASSWORD` is correct
4. Check for extra spaces in `.env` values
5. Restart backend server after changes
6. Clear browser cache and try again

---

### Problem: "Admin credentials not configured"

**Solution:**
```bash
# Check if environment variables are loaded
cd backend
cat .env | grep ADMIN

# Should show:
# ADMIN_EMAIL=shaileshsutawane@gmail.com
# ADMIN_PASSWORD=your_password
```

If missing, add them to `.env` and restart server.

---

### Problem: Token Expired

**Error:** "Token expired" or "Unauthorized"

**Solution:**
1. Login again to get new token
2. Check JWT_EXPIRE in `.env` (default: 30d)
3. Clear browser localStorage/cookies
4. Try logging in again

---

### Problem: MongoDB Connection Error

**Error:** "MongoDB connection error"

**Solution:**
1. Check `MONGO_URI` in `.env`
2. Verify MongoDB Atlas credentials
3. Check IP whitelist in MongoDB Atlas
4. Ensure database name is correct
5. Test connection string separately

---

### Problem: CORS Error

**Error:** "Access blocked by CORS policy"

**Solution:**
```env
# Update in .env
CLIENT_URL=http://localhost:5173

# Or for production:
CLIENT_URL=https://yourdomain.com
```

Restart server after changes.

---

### Problem: Cannot See Dashboard

**Solution:**
1. Verify frontend is running (`npm run dev`)
2. Check browser console for errors
3. Verify token is stored (check localStorage)
4. Try logging out and logging in again
5. Check backend logs for errors

---

## Email Notifications

### Status: ✅ Still Active

Email notifications continue to work:
- Owner receives email when someone submits admission
- Owner receives email when contact form is submitted
- Applicants receive confirmation emails

### Configuration

Email settings are in `.env`:
```env
EMAIL_USER=shaileshsutawane@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
OWNER_EMAIL=shaileshsutawane@gmail.com
```

These work **independently** of the admin dashboard.

---

## Change Admin Password

### Method 1: Update .env

1. Open `backend/.env`
2. Change `ADMIN_PASSWORD=new_password`
3. Restart server
4. Login with new password

### Method 2: Via Database (Advanced)

```bash
# Connect to MongoDB
mongo your_connection_string

# Update admin user
db.users.updateOne(
  { email: "shaileshsutawane@gmail.com" },
  { $set: { password: "hashed_new_password" } }
)
```

Note: Password must be hashed with bcrypt.

---

## Backup and Recovery

### Database Backup

```bash
# Backup MongoDB
mongodump --uri="your_mongo_uri" --out=./backup

# Restore MongoDB
mongorestore --uri="your_mongo_uri" ./backup
```

### Export Contacts (via API)

```bash
curl -H "Authorization: Bearer {token}" \
  http://localhost:5000/api/admin/contacts?limit=1000 \
  > contacts_backup.json
```

---

## Production Deployment

### Environment Variables

For production, update:
```env
NODE_ENV=production
CLIENT_URL=https://trimurticlasses.com
MONGO_URI=your_production_mongodb_uri
```

### Security Checklist

- [ ] HTTPS enabled
- [ ] Strong passwords set
- [ ] Environment variables secured
- [ ] Database backups scheduled
- [ ] Monitoring setup
- [ ] Error logging configured
- [ ] Rate limiting enabled

---

## Support

### Need Help?

**Owner Contact:**
- Name: Shailesh Sutawane
- Email: shaileshsutawane@gmail.com
- Phone: +91 99093 79193 / +91 97730 34036

### Documentation

- Backend API: `backend/README.md`
- Frontend: `frontend/README.md`
- Email Setup: `EMAIL_SETUP_GUIDE.md`

---

## Quick Reference

### Login URL
**Development:** `http://localhost:5173/admin/login`  
**Production:** `https://yourdomain.com/admin/login`

### Default Credentials
**Email:** `shaileshsutawane@gmail.com`  
**Password:** Set in `.env` file

### API Base URL
**Development:** `http://localhost:5000/api/admin`  
**Production:** `https://yourdomain.com/api/admin`

---

**Status:** ✅ Admin Dashboard Fully Configured  
**Last Updated:** December 2024  
**Version:** 1.0