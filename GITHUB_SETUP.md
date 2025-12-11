# GitHub Setup Guide

## Step-by-Step GitHub Upload

### 1. Initialize Git Repository (if not already done)

Open PowerShell in your project directory:

```powershell
cd C:\Users\Nikhil\Desktop\Trimurti-Web\trimurti-classes

# Initialize git (if not already initialized)
git init

# Check git status
git status
```

### 2. Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in details:
   - **Repository name**: `trimurti-classes`
   - **Description**: `A full-stack MERN application for Trimurti Classes - Mathematics Tuition Management System`
   - **Visibility**: Choose **Private** or **Public**
   - ❌ **DO NOT** initialize with README (you already have one)
   - ❌ **DO NOT** add .gitignore (you already have one)
4. Click **"Create repository"**

### 3. Verify .gitignore is Working

Before committing, ensure sensitive files are ignored:

```powershell
# Check what files will be added
git status

# Make sure you DON'T see these files:
# - backend/.env
# - frontend/.env
# - node_modules/
# - backend/node_modules/
# - frontend/node_modules/
# - backend/uploads/* (except .gitkeep)
```

### 4. Stage and Commit Files

```powershell
# Add all files (respecting .gitignore)
git add .

# Check what's staged
git status

# Create first commit
git commit -m "Initial commit: Trimurti Classes MERN application"
```

### 5. Connect to GitHub and Push

Replace `YOUR_USERNAME` with your GitHub username:

```powershell
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/trimurti-classes.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

### 6. Verify Upload on GitHub

1. Go to your repository: `https://github.com/YOUR_USERNAME/trimurti-classes`
2. Verify these files **ARE** present:
   - ✅ README.md
   - ✅ .gitignore
   - ✅ package.json
   - ✅ backend/.env.example
   - ✅ frontend/.env.example
   - ✅ All source code files
   - ✅ DEPLOYMENT_GUIDE.md

3. Verify these files **ARE NOT** present (should be ignored):
   - ❌ backend/.env
   - ❌ frontend/.env
   - ❌ node_modules/
   - ❌ backend/node_modules/
   - ❌ frontend/node_modules/
   - ❌ backend/uploads/* (except .gitkeep)
   - ❌ .vscode/settings.json

---

## If You See Sensitive Files (Fix)

If you accidentally committed `.env` files or `node_modules`:

```powershell
# Remove from git (but keep local copy)
git rm --cached backend/.env
git rm --cached frontend/.env
git rm -r --cached node_modules
git rm -r --cached backend/node_modules
git rm -r --cached frontend/node_modules

# Commit the removal
git commit -m "Remove sensitive files from git"

# Push changes
git push origin main
```

---

## Future Updates

After making changes to your code:

```powershell
# Check what changed
git status

# Add specific files or all changes
git add .

# Commit with meaningful message
git commit -m "Update: description of what you changed"

# Push to GitHub
git push origin main
```

### Example Commit Messages:
- `"Fix: Dark mode styling in admissions page"`
- `"Update: Fee structure for classes 5-12"`
- `"Add: New course management features"`
- `"Fix: CORS issue in production"`

---

## Branch Strategy (Recommended)

For safer development:

```powershell
# Create development branch
git checkout -b development

# Make changes, commit
git add .
git commit -m "Add new feature"

# Push development branch
git push origin development

# When ready, merge to main
git checkout main
git merge development
git push origin main
```

---

## Clone Repository (On Another Computer)

```powershell
# Clone the repository
git clone https://github.com/YOUR_USERNAME/trimurti-classes.git

# Navigate to project
cd trimurti-classes

# Install dependencies
npm run install-all

# Copy environment files
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env

# Edit .env files with your actual credentials
# Then run the project
npm run dev
```

---

## Important Reminders

### ⚠️ NEVER Commit These Files:
- ❌ `.env` files (contain secrets)
- ❌ `node_modules/` (too large, auto-generated)
- ❌ Build files (`dist/`, `build/`)
- ❌ Log files
- ❌ IDE settings (`.vscode/`, `.idea/`)

### ✅ ALWAYS Commit These:
- ✅ Source code (`.js`, `.jsx`, `.css`)
- ✅ Configuration files (`package.json`, `vite.config.js`)
- ✅ `.env.example` files
- ✅ Documentation (`.md` files)
- ✅ `.gitignore`

---

## Troubleshooting

### Issue: "Permission denied (publickey)"
**Solution**: Set up SSH keys or use HTTPS with Personal Access Token

```powershell
# Use HTTPS instead
git remote set-url origin https://github.com/YOUR_USERNAME/trimurti-classes.git
```

### Issue: "Repository not found"
**Solution**: Verify repository name and URL

```powershell
# Check remote URL
git remote -v

# Update if needed
git remote set-url origin https://github.com/YOUR_USERNAME/trimurti-classes.git
```

### Issue: "Failed to push - updates were rejected"
**Solution**: Pull first, then push

```powershell
git pull origin main --rebase
git push origin main
```

---

## GitHub Repository Settings (Recommended)

After uploading to GitHub:

1. **Add Repository Description**: 
   - Go to repository settings
   - Add: "MERN Stack application for Trimurti Classes tuition management"

2. **Add Topics/Tags**:
   - `mern-stack`, `react`, `nodejs`, `express`, `mongodb`, `education`, `tuition-management`

3. **Enable Issues**: For bug tracking

4. **Add Collaborators**: Settings → Collaborators (if working with team)

5. **Branch Protection** (Optional):
   - Settings → Branches
   - Add rule for `main` branch
   - Require pull request reviews

---

## Next Steps After GitHub Upload

1. ✅ Verify all files uploaded correctly
2. ✅ Check .env files are NOT visible on GitHub
3. ✅ Read DEPLOYMENT_GUIDE.md for deployment instructions
4. ✅ Deploy backend to Render.com
5. ✅ Deploy frontend to Vercel
6. ✅ Update environment variables on hosting platforms
7. ✅ Test production deployment

---

**You're all set!** 🎉 Your code is now safely on GitHub and ready for deployment.
