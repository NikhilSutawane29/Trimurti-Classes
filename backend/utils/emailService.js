const nodemailer = require('nodemailer');

/**
 * Email Service for Trimurti Classes
 * Handles all email notifications for contact forms, admissions, etc.
 */

// Create reusable transporter
let transporter = null;

/**
 * Initialize email transporter
 */
const initializeTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'shaileshsutawane@gmail.com',
        pass: process.env.EMAIL_PASSWORD // App password from Google
      }
    });
  }
  return transporter;
};

/**
 * Send contact form notification to owner
 * @param {Object} contactData - Contact form data
 */
exports.sendContactNotification = async (contactData) => {
  try {
    const transport = initializeTransporter();

    const { name, email, phone, subject, message, regarding } = contactData;

    const mailOptions = {
      from: `"Trimurti Classes Website" <${process.env.EMAIL_USER || 'shaileshsutawane@gmail.com'}>`,
      to: process.env.OWNER_EMAIL || 'shaileshsutawane@gmail.com',
      subject: `New Contact Form Submission - ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1e40af; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #1e40af; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
              <p>Trimurti Classes Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Regarding:</div>
                <div class="value">${regarding || 'General Inquiry'}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the Trimurti Classes website contact form.</p>
              <p>Please respond to the customer at: ${email}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission - Trimurti Classes

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Regarding: ${regarding || 'General Inquiry'}

Message:
${message}

---
This email was sent from the Trimurti Classes website.
Please respond to: ${email}
      `
    };

    const info = await transport.sendMail(mailOptions);
    console.log('Contact notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send admission inquiry notification to owner
 * @param {Object} admissionData - Admission form data
 */
exports.sendAdmissionNotification = async (admissionData) => {
  try {
    const transport = initializeTransporter();

    const { fullName, email, phone, standard, medium, subject, message } = admissionData;

    const mailOptions = {
      from: `"Trimurti Classes Website" <${process.env.EMAIL_USER || 'shaileshsutawane@gmail.com'}>`,
      to: process.env.OWNER_EMAIL || 'shaileshsutawane@gmail.com',
      subject: `New Admission Inquiry - ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #059669; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #059669; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #059669; }
            .highlight { background-color: #d1fae5; padding: 10px; border-radius: 5px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎓 New Admission Inquiry</h2>
              <p>Trimurti Classes Website</p>
            </div>
            <div class="content">
              <div class="highlight">
                <strong>New Student Inquiry Received!</strong>
              </div>
              <div class="field">
                <div class="label">Student Name:</div>
                <div class="value">${fullName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Standard/Class:</div>
                <div class="value">${standard}</div>
              </div>
              <div class="field">
                <div class="label">Medium:</div>
                <div class="value">${medium}</div>
              </div>
              ${subject ? `
              <div class="field">
                <div class="label">Subject Interest:</div>
                <div class="value">${subject}</div>
              </div>
              ` : ''}
              ${message ? `
              <div class="field">
                <div class="label">Additional Message:</div>
                <div class="value">${message}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>This is an admission inquiry from the Trimurti Classes website.</p>
              <p>Please contact the student/parent at: ${email} or ${phone}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Admission Inquiry - Trimurti Classes

Student Name: ${fullName}
Email: ${email}
Phone: ${phone}
Standard/Class: ${standard}
Medium: ${medium}
${subject ? `Subject Interest: ${subject}` : ''}

${message ? `Additional Message:\n${message}` : ''}

---
This is an admission inquiry from the Trimurti Classes website.
Please contact at: ${email} or ${phone}
      `
    };

    const info = await transport.sendMail(mailOptions);
    console.log('Admission notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending admission notification email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send confirmation email to the user who submitted the form
 * @param {Object} userData - User data
 * @param {String} type - Type of form ('contact' or 'admission')
 */
exports.sendConfirmationEmail = async (userData, type = 'contact') => {
  try {
    const transport = initializeTransporter();

    const { name, email } = userData;

    const mailOptions = {
      from: `"Trimurti Classes" <${process.env.EMAIL_USER || 'shaileshsutawane@gmail.com'}>`,
      to: email,
      subject: type === 'admission'
        ? 'Thank You for Your Admission Inquiry - Trimurti Classes'
        : 'Thank You for Contacting Us - Trimurti Classes',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .footer { background-color: #1f2937; color: white; padding: 15px; text-align: center; margin-top: 20px; border-radius: 5px; }
            .info-box { background-color: #dbeafe; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Trimurti Classes</h2>
              <p>The Power of Mathematics</p>
            </div>
            <div class="content">
              <h3>Dear ${name},</h3>
              <p>Thank you for ${type === 'admission' ? 'your interest in joining' : 'contacting'} Trimurti Classes!</p>

              <p>We have received your ${type === 'admission' ? 'admission inquiry' : 'message'} and will get back to you within 24-48 hours.</p>

              <div class="info-box">
                <strong>Contact Information:</strong><br>
                📞 Phone: +91 99093 79193 / +91 97730 34036<br>
                📧 Email: shaileshsutawane@gmail.com<br>
                📍 Address: S.F./1 Amrapali Apartment, Near Air Force Station, Makarpura Road, Vadodara
              </div>

              <p>If you have any urgent queries, please feel free to call us directly.</p>

              <p>Best regards,<br>
              <strong>Shailesh Sutawane</strong><br>
              Trimurti Classes</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Trimurti Classes. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Dear ${name},

Thank you for ${type === 'admission' ? 'your interest in joining' : 'contacting'} Trimurti Classes!

We have received your ${type === 'admission' ? 'admission inquiry' : 'message'} and will get back to you within 24-48 hours.

Contact Information:
Phone: +91 99093 79193 / +91 97730 34036
Email: shaileshsutawane@gmail.com
Address: S.F./1 Amrapali Apartment, Near Air Force Station, Makarpura Road, Vadodara

If you have any urgent queries, please feel free to call us directly.

Best regards,
Shailesh Sutawane
Trimurti Classes

© ${new Date().getFullYear()} Trimurti Classes. All rights reserved.
      `
    };

    const info = await transport.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Verify email configuration
 */
exports.verifyEmailConfig = async () => {
  try {
    const transport = initializeTransporter();
    await transport.verify();
    console.log('Email service is ready to send emails');
    return { success: true, message: 'Email service configured successfully' };
  } catch (error) {
    console.error('Email service configuration error:', error);
    return { success: false, error: error.message };
  }
};
