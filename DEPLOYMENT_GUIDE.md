# Deployment Guide - Trimurti Classes

## Pre-Deployment Checklist ✅

### 1. Environment Variables Setup
- [ ] Backend `.env` configured with production MongoDB URI
- [ ] Backend `.env` has secure JWT_SECRET (32+ characters)
- [ ] Cloudinary credentials configured
- [ ] Email SMTP configured (Gmail/SendGrid)
- [ ] Frontend `.env` has correct API URL
- [ ] All sensitive data removed from code

### 2. Security Check
- [ ] All `.env` files are in `.gitignore`
- [ ] No hardcoded credentials in code
- [ ] CORS properly configured for production domain
- [ ] Helmet.js security headers enabled
- [ ] Rate limiting implemented (if needed)

### 3. Code Quality
- [ ] No console errors in browser
- [ ] No ESLint errors
- [ ] All API endpoints tested
- [ ] Dark mode working correctly
- [ ] Responsive design verified

---

## Deployment Options

### Option 1: Deploy Backend on Render.com + Frontend on Vercel

#### **Backend Deployment (Render.com)** - FREE

1. **Create Render Account**: Go to [render.com](https://render.com)

2. **Connect GitHub Repository**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service**:
   ```
   Name: trimurti-classes-api
   Region: Choose nearest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables** (in Render dashboard):
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secure_jwt_secret
   JWT_EXPIRE=30d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   CLIENT_URL=https://your-frontend-domain.vercel.app
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_EMAIL=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   FROM_EMAIL=noreply@trimurticlasses.com
   FROM_NAME=Trimurti Classes
   ```

5. **Deploy**: Click "Create Web Service"

6. **Note Your Backend URL**: `https://trimurti-classes-api.onrender.com`

#### **Frontend Deployment (Vercel)** - FREE

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com)

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select your repository

3. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables** (in Vercel dashboard):
   ```
   VITE_API_URL=https://trimurti-classes-api.onrender.com/api
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   VITE_APP_ENV=production
   VITE_APP_NAME=Trimurti Classes
   VITE_ENABLE_ANALYTICS=false
   ```

5. **Deploy**: Click "Deploy"

6. **Custom Domain** (Optional): Add your custom domain in Vercel settings

---

### Option 2: Deploy on Railway.app (Full-Stack) - FREE

1. **Create Railway Account**: [railway.app](https://railway.app)

2. **Deploy Backend**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Add service: Backend
   - Set root directory: `backend`
   - Add all environment variables
   - Deploy

3. **Deploy Frontend**:
   - Add another service: Frontend
   - Set root directory: `frontend`
   - Add environment variables
   - Deploy

---

### Option 3: Heroku (Backend + Frontend)

#### Backend on Heroku:
```bash
cd backend
heroku create trimurti-classes-api
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your_mongodb_uri
# ... add all other env variables
git push heroku main
```

#### Frontend on Heroku:
```bash
cd frontend
heroku create trimurti-classes-web
heroku config:set VITE_API_URL=https://trimurti-classes-api.herokuapp.com/api
# ... add all other env variables
heroku buildpacks:add heroku/nodejs
git push heroku main
```

---

## MongoDB Atlas Setup (Required for All Options)

1. **Create Account**: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create Cluster**: 
   - Choose FREE M0 cluster
   - Select region closest to your server

3. **Database Access**:
   - Create database user
   - Note username and password

4. **Network Access**:
   - Add IP: `0.0.0.0/0` (allow from anywhere)
   - Or add specific IPs from Render/Vercel

5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `myFirstDatabase` with `trimurti-classes`

---

## Cloudinary Setup (For Image Uploads)

1. **Create Account**: [cloudinary.com](https://cloudinary.com)

2. **Get Credentials**:
   - Dashboard → Account Details
   - Copy: Cloud Name, API Key, API Secret

3. **Create Upload Preset**:
   - Settings → Upload
   - Add upload preset: `trimurti_upload`
   - Set to "Unsigned"

---

## Email Setup (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account

2. **Generate App Password**:
   - Google Account → Security
   - App passwords → Select app: Mail
   - Generate and copy password

3. **Use in .env**:
   ```
   SMTP_EMAIL=your.email@gmail.com
   SMTP_PASSWORD=your_16_digit_app_password
   ```

---

## Post-Deployment Steps

### 1. Update CORS Settings
In `backend/server.js`, update CLIENT_URL to production domain:
```javascript
cors({
  origin: process.env.CLIENT_URL || 'https://your-domain.vercel.app',
  credentials: true
})
```

### 2. Test Production Build Locally
```bash
# Backend
cd backend
NODE_ENV=production npm start

# Frontend
cd frontend
npm run build
npm run preview
```

### 3. Create Admin User
After deployment, access: `https://your-api-url/api/auth/setup-admin`

### 4. Verify All Features
- [ ] User registration/login
- [ ] Course browsing
- [ ] Contact form submission
- [ ] Admin dashboard access
- [ ] Image uploads
- [ ] Dark mode toggle
- [ ] All pages responsive

---

## Troubleshooting

### Backend Issues:
- **500 Error**: Check MongoDB connection, verify MONGO_URI
- **CORS Error**: Verify CLIENT_URL matches frontend domain
- **Auth Error**: Verify JWT_SECRET is set

### Frontend Issues:
- **API Error**: Verify VITE_API_URL is correct
- **Build Error**: Check all dependencies installed
- **Blank Page**: Check browser console for errors

### Common Fixes:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check environment variables
printenv | grep VITE_  # Frontend
printenv | grep MONGO  # Backend
```

---

## Production Environment Variables Summary

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/trimurti-classes
JWT_SECRET=your_32_character_minimum_secret_key
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLIENT_URL=https://your-frontend-domain.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@trimurticlasses.com
FROM_NAME=Trimurti Classes
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.onrender.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_name
VITE_CLOUDINARY_UPLOAD_PRESET=trimurti_upload
VITE_APP_ENV=production
VITE_APP_NAME=Trimurti Classes
```

---

## Recommended Setup (FREE)
✅ **Backend**: Render.com (Free tier)
✅ **Frontend**: Vercel (Free tier)
✅ **Database**: MongoDB Atlas (Free M0 cluster)
✅ **Images**: Cloudinary (Free tier)
✅ **Email**: Gmail SMTP (Free)

**Total Cost**: $0/month 🎉

---

## Support
For deployment issues, check:
- Render logs: Dashboard → Logs
- Vercel logs: Deployment → Function Logs
- MongoDB logs: Atlas Dashboard → Metrics

Good luck with your deployment! 🚀
