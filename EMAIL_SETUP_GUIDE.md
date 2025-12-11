# 📧 Email Setup Guide for Trimurti Classes

## Overview

This guide will help you set up the email notification system for Trimurti Classes. When someone submits an admission inquiry or contact form, **Shailesh Sutawane** will automatically receive an email notification at **shaileshsutawane@gmail.com**.

## ✨ Features

The email system provides:

1. **Admission Inquiry Notifications** - Receive instant emails when someone applies for admission
2. **Contact Form Notifications** - Get notified when someone contacts through the website
3. **Auto-Reply Emails** - Students/parents receive automatic confirmation emails
4. **Professional Templates** - Beautiful HTML email templates with Trimurti Classes branding

---

## 🚀 Step-by-Step Setup

### Step 1: Install Nodemailer Package

First, you need to install the nodemailer package in your backend:

```bash
cd backend
npm install nodemailer
```

This package is already added to `package.json`, so you can also run:

```bash
npm install
```

---

### Step 2: Enable Gmail App Password

Since Gmail has security restrictions, you cannot use your regular Gmail password for sending emails from applications. You need to generate an **App Password**.

#### A. Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "How you sign in to Google", click **2-Step Verification**
4. Follow the steps to enable 2-Step Verification (if not already enabled)

#### B. Generate App Password

1. After enabling 2-Step Verification, go back to **Security**
2. Under "How you sign in to Google", click **App passwords**
3. You might need to sign in again
4. Select app: Choose **Mail**
5. Select device: Choose **Other (Custom name)**
6. Enter a name like: **Trimurti Classes Website**
7. Click **Generate**
8. Google will show you a 16-character password (like: `abcd efgh ijkl mnop`)
9. **IMPORTANT**: Copy this password immediately - you won't be able to see it again!

---

### Step 3: Configure Environment Variables

Create or update the `.env` file in your `backend` folder:

```env
# Email Configuration
EMAIL_USER=shaileshsutawane@gmail.com
EMAIL_PASSWORD=your-16-character-app-password-here
OWNER_EMAIL=shaileshsutawane@gmail.com

# Example:
# EMAIL_PASSWORD=abcd efgh ijkl mnop
# (Paste the App Password you copied in Step 2)
```

**IMPORTANT NOTES:**
- Replace `your-16-character-app-password-here` with the actual App Password you generated
- Keep spaces in the password if they were shown with spaces
- Never share this `.env` file or commit it to GitHub
- The `.env` file is already in `.gitignore` for security

---

### Step 4: Update .env.example

For documentation purposes, update the `.env.example` file (without actual passwords):

```env
# Email Configuration for sending notifications
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-from-google
OWNER_EMAIL=owner-email@gmail.com

# Example:
# EMAIL_USER=shaileshsutawane@gmail.com
# EMAIL_PASSWORD=abcd efgh ijkl mnop
# OWNER_EMAIL=shaileshsutawane@gmail.com
```

---

### Step 5: Restart Backend Server

After setting up the environment variables, restart your backend server:

```bash
# Stop the current server (Ctrl+C)
# Then start it again:
npm run dev
```

Or if using production:

```bash
npm start
```

---

## 🧪 Testing the Email System

### Test 1: Check Email Configuration

The server will automatically verify the email configuration when it starts. Look for this message in the console:

```
Email service is ready to send emails
```

If you see an error, check your credentials.

### Test 2: Submit a Test Admission Form

1. Go to your website: `http://localhost:5173/admissions`
2. Fill out the admission form with test data
3. Submit the form
4. Check the email inbox at **shaileshsutawane@gmail.com**
5. You should receive an email with the admission inquiry details

### Test 3: Submit a Test Contact Form

1. Go to: `http://localhost:5173/contact`
2. Fill out the contact form
3. Submit the form
4. Check the email inbox for a contact form notification

---

## 📧 What Emails Will Be Sent?

### 1. Admission Inquiry (to Owner)

When someone submits an admission form, Shailesh receives an email with:
- Student Name
- Email & Phone
- Standard/Class
- Medium (Gujarati/English)
- Subject Interest
- Additional Message

### 2. Contact Form Submission (to Owner)

When someone uses the contact form, Shailesh receives:
- Sender Name
- Email & Phone
- Subject
- Message
- Regarding (General/Admission/Fees/Other)

### 3. Confirmation Email (to Student/Parent)

The person who submitted the form receives an automatic confirmation with:
- Thank you message
- Confirmation that inquiry was received
- Contact information for Trimurti Classes
- Expected response time (24-48 hours)

---

## 🔍 Troubleshooting

### Problem: "Invalid login credentials" or "Username and Password not accepted"

**Solution:**
1. Make sure you enabled 2-Step Verification on your Google Account
2. Generate a new App Password (don't use regular Gmail password)
3. Copy the App Password correctly (with or without spaces)
4. Update the `.env` file with the correct password
5. Restart the backend server

### Problem: Emails not being received

**Solution:**
1. Check the spam/junk folder in Gmail
2. Verify the `OWNER_EMAIL` in `.env` is correct
3. Check the backend console for error messages
4. Test your Gmail account by logging in to verify it's active

### Problem: "EAUTH" error in console

**Solution:**
- This means authentication failed
- Your App Password is incorrect or expired
- Generate a new App Password and update `.env`

### Problem: "ECONNREFUSED" error

**Solution:**
- Check your internet connection
- Verify you can access Gmail normally
- Try again after a few minutes

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep your `.env` file secure and never commit it to GitHub
- Use App Passwords instead of your main Gmail password
- Enable 2-Step Verification for better security
- Regularly rotate your App Passwords (every 6 months)
- Keep your backend server and dependencies updated

### ❌ DON'T:
- Never share your App Password publicly
- Don't use your regular Gmail password in the code
- Don't commit `.env` file to version control
- Don't share screenshots containing passwords

---

## 📝 Email Service Configuration

The email service is located at:
```
backend/utils/emailService.js
```

### Current Settings:
- **Service**: Gmail
- **From Email**: shaileshsutawane@gmail.com
- **To Email**: shaileshsutawane@gmail.com
- **Email Format**: HTML (with fallback to plain text)

### To Change Email Templates:

Edit the email templates in `backend/utils/emailService.js`:
- `sendContactNotification()` - For contact form emails
- `sendAdmissionNotification()` - For admission inquiry emails
- `sendConfirmationEmail()` - For auto-reply emails

---

## 🎨 Email Template Customization

The current emails include:
- **Professional Header**: Trimurti Classes branding
- **Color Scheme**: Blue (#1e40af) for brand consistency
- **Responsive Design**: Looks good on desktop and mobile
- **Clickable Links**: Phone numbers and email addresses are clickable

To customize colors, edit the `<style>` section in each email function.

---

## 📱 Email Features

### For Owner (Shailesh):
- ✉️ Instant notifications when forms are submitted
- 📋 All submission details in one email
- 📞 Clickable phone numbers and email addresses
- 🎨 Professional, branded templates

### For Students/Parents:
- ✅ Instant confirmation email
- ℹ️ Contact information included
- ⏰ Expected response time mentioned
- 💼 Professional appearance

---

## 🆘 Support

If you encounter any issues:

1. **Check the backend console** for detailed error messages
2. **Review this guide** to ensure all steps were followed
3. **Test with a different Gmail account** if needed
4. **Check Google Account settings** at https://myaccount.google.com/
5. **Contact your developer** for technical assistance

---

## 📊 Monitoring Email Delivery

### Check Email Logs:
The backend console will show:
```
Contact notification email sent: <message-id>
Confirmation email sent to applicant
```

### Failed Email Attempts:
If an email fails, you'll see:
```
Failed to send contact notification email: <error details>
```

**Note**: Even if email sending fails, the form submission will still be saved to the database, so no data is lost.

---

## 🔄 Future Enhancements

Possible improvements for the email system:

1. **Email Templates**: Add more customizable templates
2. **SMS Notifications**: Add SMS alerts for urgent inquiries
3. **Email Scheduling**: Send daily digest of all inquiries
4. **Attachment Support**: Allow students to attach documents
5. **Follow-up Reminders**: Automatic reminders for pending inquiries

---

## ✅ Checklist

Before going live, ensure:

- [ ] Nodemailer package is installed
- [ ] 2-Step Verification is enabled on Gmail
- [ ] App Password is generated
- [ ] `.env` file is configured with correct credentials
- [ ] `.env` is listed in `.gitignore`
- [ ] Backend server restarts successfully
- [ ] Test admission form sends email
- [ ] Test contact form sends email
- [ ] Confirmation emails are received by submitters
- [ ] Emails arrive in inbox (not spam)
- [ ] All email links and phone numbers work

---

## 📞 Contact

**Email Configuration Owner:** Shailesh Sutawane  
**Email:** shaileshsutawane@gmail.com  
**Phone:** +91 99093 79193 / +91 97730 34036  

---

**Last Updated:** December 2024  
**Version:** 1.0  
**Project:** Trimurti Classes Website