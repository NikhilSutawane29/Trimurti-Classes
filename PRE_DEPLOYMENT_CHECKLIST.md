# 🚀 PRE-DEPLOYMENT CHECKLIST

Use this checklist before deploying your project to production and uploading to GitHub.

## ✅ Security & Environment Variables

- [ ] **Backend `.env` is in `.gitignore`** - Verify it won't be uploaded
- [ ] **Frontend `.env` is in `.gitignore`** - Verify it won't be uploaded
- [ ] **`.env.example` files created** for both backend and frontend
- [ ] **No hardcoded credentials** in source code (check for API keys, passwords, tokens)
- [ ] **JWT_SECRET is strong** (minimum 32 characters, random)
- [ ] **MongoDB URI uses strong password** (no special characters in password)
- [ ] **CORS configured correctly** for production domain
- [ ] **Cloudinary credentials** are valid and working
- [ ] **Email credentials** tested (Gmail app password, not regular password)

## ✅ Code Quality & Functionality

- [ ] **No console errors** in browser developer tools
- [ ] **All pages load correctly** (test all routes)
- [ ] **Forms submit successfully** (contact form, admission form, auth forms)
- [ ] **Authentication works** (register, login, logout, protected routes)
- [ ] **Admin dashboard accessible** (test admin login)
- [ ] **Course pages working** (list, detail, create, edit, delete)
- [ ] **Gallery uploads working** (image upload via Cloudinary)
- [ ] **Dark mode toggles correctly** on all pages
- [ ] **Responsive design verified** (mobile, tablet, desktop)
- [ ] **All API endpoints tested** (use Postman or browser)

## ✅ Dependencies & Build

- [ ] **All dependencies installed** (`npm run install-all`)
- [ ] **No missing packages** in package.json files
- [ ] **Frontend builds successfully** (`cd frontend && npm run build`)
- [ ] **Backend starts without errors** (`cd backend && npm start`)
- [ ] **No deprecated packages** (run `npm outdated`)
- [ ] **node_modules in .gitignore** (verify before git push)

## ✅ Database

- [ ] **MongoDB Atlas account created** (if not using local MongoDB)
- [ ] **Database cluster created** (free M0 tier)
- [ ] **Database user created** with read/write permissions
- [ ] **Network access configured** (0.0.0.0/0 or specific IPs)
- [ ] **Connection string tested** (can connect successfully)
- [ ] **Database name set correctly** in connection string

## ✅ External Services Setup

### Cloudinary (Image Uploads)
- [ ] **Account created** at cloudinary.com
- [ ] **Cloud name obtained**
- [ ] **API key and secret obtained**
- [ ] **Upload preset created** (unsigned upload preset named `trimurti_upload`)
- [ ] **Test upload successful** from admin gallery

### Email Service (Gmail)
- [ ] **2-Factor Authentication enabled** on Gmail account
- [ ] **App password generated** (not regular Gmail password)
- [ ] **Email sending tested** (submit contact form)
- [ ] **Email templates rendering correctly**

## ✅ File Structure

- [ ] **`.gitignore` file exists** in root directory
- [ ] **`backend/uploads/.gitkeep` exists** (keeps uploads folder but ignores files)
- [ ] **No unnecessary files** (remove test files, temp files)
- [ ] **Documentation updated** (README.md, guides)
- [ ] **No personal data in code** (remove test user data, sample emails)

## ✅ Git & GitHub

- [ ] **Git initialized** (`git init`)
- [ ] **All changes staged** (`git add .`)
- [ ] **First commit created** (`git commit -m "Initial commit"`)
- [ ] **GitHub repository created**
- [ ] **Remote added** (`git remote add origin <url>`)
- [ ] **Pushed to GitHub** (`git push -u origin main`)
- [ ] **Verify on GitHub**: .env files NOT visible
- [ ] **Verify on GitHub**: node_modules NOT uploaded
- [ ] **Repository is private/public** (as per your choice)

## ✅ Deployment Preparation

- [ ] **Read DEPLOYMENT_GUIDE.md** completely
- [ ] **Hosting platform chosen** (Render + Vercel recommended)
- [ ] **Production environment variables prepared**
- [ ] **Backend deployment planned**
- [ ] **Frontend deployment planned**
- [ ] **Custom domain ready** (optional)

## ✅ Production Environment Variables

### Backend (.env for production)
```env
✓ NODE_ENV=production
✓ MONGO_URI=<production_mongodb_uri>
✓ JWT_SECRET=<strong_random_32+_chars>
✓ CLOUDINARY_CLOUD_NAME=<your_cloud_name>
✓ CLOUDINARY_API_KEY=<your_api_key>
✓ CLOUDINARY_API_SECRET=<your_api_secret>
✓ CLIENT_URL=<production_frontend_url>
✓ EMAIL_USER=<your_gmail>
✓ EMAIL_PASSWORD=<gmail_app_password>
✓ OWNER_EMAIL=<your_email>
```

### Frontend (.env for production)
```env
✓ VITE_API_URL=<production_backend_url>/api
✓ VITE_CLOUDINARY_CLOUD_NAME=<your_cloud_name>
✓ VITE_CLOUDINARY_UPLOAD_PRESET=trimurti_upload
✓ VITE_APP_ENV=production
```

## ✅ Testing Checklist

### Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Logout successfully
- [ ] Access protected routes (should redirect if not logged in)
- [ ] Admin login works
- [ ] Admin-only routes protected

### Forms
- [ ] Contact form submits and sends email
- [ ] Admission form submits and sends email
- [ ] User registration form validation works
- [ ] Error messages display correctly

### Course Management
- [ ] View all courses
- [ ] View course details
- [ ] Admin can create course
- [ ] Admin can edit course
- [ ] Admin can delete course

### Gallery
- [ ] Images display correctly
- [ ] Admin can upload images
- [ ] Images stored in Cloudinary
- [ ] Image delete works

### UI/UX
- [ ] All icons load (Lucide icons)
- [ ] Images load correctly
- [ ] Animations work smoothly
- [ ] No layout breaks on mobile
- [ ] Dark mode works on all pages
- [ ] Theme persists on page refresh

## ✅ Final Verification

- [ ] **Local development works**: `npm run dev`
- [ ] **Production build works**: `npm run build` (frontend)
- [ ] **No errors in terminal**
- [ ] **No errors in browser console**
- [ ] **All external services connected**
- [ ] **All API endpoints respond**

## 🚨 Common Issues to Check

1. **CORS Errors**: Verify CLIENT_URL matches your frontend domain
2. **MongoDB Connection**: Check connection string format and credentials
3. **Cloudinary Uploads**: Verify upload preset is set to "unsigned"
4. **Email Not Sending**: Use Gmail app password, not regular password
5. **Build Errors**: Clear cache and reinstall dependencies
6. **404 Errors**: Check VITE_API_URL includes `/api` at the end
7. **Dark Mode**: Verify Tailwind dark mode classes are applied

## ✅ Post-Deployment Checklist

After deploying to production:

- [ ] **Backend API responding** (visit /api health check endpoint)
- [ ] **Frontend loads** (visit production URL)
- [ ] **Database connected** (check logs)
- [ ] **Images uploading** (test gallery upload)
- [ ] **Emails sending** (test contact form)
- [ ] **All pages accessible**
- [ ] **HTTPS working** (secure connection)
- [ ] **No mixed content warnings**

---

## 🎯 Quick Pre-Push Command

Before pushing to GitHub, run:

```powershell
# Check what will be committed
git status

# Make sure these are NOT listed:
# ❌ backend/.env
# ❌ frontend/.env  
# ❌ node_modules/
# ❌ backend/node_modules/
# ❌ frontend/node_modules/

# If you see them, check your .gitignore file!
```

---

## 📝 Final Notes

- Keep your `.env` files **LOCAL ONLY** - never commit them
- Keep your `.env.example` files **UP TO DATE** - commit these
- Test thoroughly in **development** before deploying to **production**
- Keep **backups** of your `.env` files in a secure location (password manager)
- Update **DEPLOYMENT_GUIDE.md** if you add new environment variables

---

**When all checkboxes are ✅, you're ready to deploy!** 🚀

Good luck with your deployment! 
