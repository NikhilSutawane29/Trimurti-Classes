# 📧 Quick Email Setup - Trimurti Classes

## What This Does

When someone applies for admission or contacts through the website, **Shailesh Sutawane** will automatically receive an email notification at **shaileshsutawane@gmail.com**.

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Install Required Package

Open terminal in the `backend` folder and run:

```bash
npm install nodemailer
```

---

### Step 2: Get Gmail App Password

1. Go to https://myaccount.google.com/
2. Click **Security** → **2-Step Verification** (enable if not already enabled)
3. Go back to **Security** → Click **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Type: "Trimurti Classes Website"
6. Click **Generate**
7. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

---

### Step 3: Update .env File

Open `backend/.env` file and add these lines:

```env
EMAIL_USER=shaileshsutawane@gmail.com
EMAIL_PASSWORD=paste-your-16-character-password-here
OWNER_EMAIL=shaileshsutawane@gmail.com
```

**Example:**
```env
EMAIL_USER=shaileshsutawane@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
OWNER_EMAIL=shaileshsutawane@gmail.com
```

---

### Step 4: Restart Server

Stop the backend server (Ctrl+C) and restart it:

```bash
npm run dev
```

---

### Step 5: Test It

1. Go to website: `http://localhost:5173/admissions`
2. Fill out and submit the admission form
3. Check inbox at **shaileshsutawane@gmail.com**
4. You should receive an email with the admission details!

---

## ✅ What You'll Receive

### When Someone Applies for Admission:
- Email with student name, phone, class, medium
- All details in a nicely formatted email
- Clickable phone numbers and email addresses

### When Someone Uses Contact Form:
- Email with sender's name, message, and contact info
- Subject and inquiry type included

### Auto-Reply to Students:
- Students/parents receive automatic confirmation
- Includes your contact information
- Professional branded email

---

## 🔧 Troubleshooting

**Problem: Not receiving emails?**
- Check spam/junk folder
- Verify App Password is correct in `.env`
- Make sure you restarted the server after updating `.env`

**Problem: "Invalid credentials" error?**
- Generate a new App Password from Google
- Copy it exactly (with or without spaces, both work)
- Update `.env` and restart server

**Problem: "EAUTH" error?**
- Your App Password is wrong
- Go to Google Account → Security → App passwords
- Delete old password and generate a new one

---

## 🔒 Security

- ✅ Never share your App Password
- ✅ Keep `.env` file private (already in `.gitignore`)
- ✅ Use App Password, NOT your regular Gmail password
- ✅ The `.env` file will NOT be uploaded to GitHub

---

## 📁 Files Involved

```
backend/
├── .env                               # Your email credentials (DO NOT SHARE)
├── utils/emailService.js              # Email sending logic
├── controllers/contact.controller.js  # Handles contact form + sends email
├── controllers/admission.controller.js # Handles admission + sends email
├── routes/admission.routes.js         # Admission API route
└── server.js                          # Main server (includes admission route)

frontend/
└── src/pages/AdmissionsPage.jsx       # Admission form (calls API)
```

---

## ✨ Success Indicators

You'll know it's working when:

1. ✅ Server starts without errors
2. ✅ Console shows: "Email service is ready to send emails"
3. ✅ Submitting admission form shows success message
4. ✅ Email arrives in shaileshsutawane@gmail.com inbox
5. ✅ Student receives confirmation email

---

## 💡 Important Notes

- Emails are sent **asynchronously** - form submission won't fail if email fails
- All form data is saved to database even if email fails
- Check backend console for email sending status
- Emails usually arrive within 1-2 seconds

---

## 📞 Need Help?

If you're stuck:
1. Check backend console for error messages
2. Review your App Password setup
3. Ensure `.env` file has no extra spaces
4. Try generating a fresh App Password

**Contact:** Shailesh Sutawane - shaileshsutawane@gmail.com

---

**That's it! You're all set up! 🎉**