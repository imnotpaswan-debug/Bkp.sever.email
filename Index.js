const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// CORS allow karna zaroori hai taaki aapka app isse baat kar sake
app.use(cors());
app.use(express.json());

// 1. Home Route: Check karne ke liye ki server online hai ya nahi
app.get('/', (req, res) => {
  res.send('<h1>BKP ESPORTS Server is Live!</h1><p>Status: Running Successfully</p>');
});

// 2. Email Transporter Setup (Gmail API)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'bkptournament@gmail.com', // Aapka Gmail
    pass: 'aglo dmyb jgew ygkv'     // Aapka App Password
  }
});

// 3. OTP Send karne ka Main Route
app.get('/send-otp', async (req, res) => {
  const { email, otp } = req.query;

  // Agar email ya otp miss ho jaye
  if (!email || !otp) {
    return res.status(400).send('Error: Email and OTP are required');
  }

  // Email ka design aur content
  const mailOptions = {
    from: '"BKP ESPORTS" <bkptournament@gmail.com>',
    to: email,
    subject: 'OTP Verification - BKP ESPORTS',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 2px solid #e91e63; padding: 20px; border-radius: 15px; max-width: 500px; margin: auto;">
        <h2 style="color: #e91e63; text-align: center;">BKP ESPORTS ARENA</h2>
        <hr style="border: 0.5px solid #eee;">
        <p style="font-size: 16px; color: #333;">Namaste Warrior,</p>
        <p style="font-size: 14px; color: #666;">Aapke registration ke liye OTP code niche diya gaya hai:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; background: #fdf2f5; padding: 10px 30px; border: 1px dashed #e91e63; color: #e91e63; letter-spacing: 5px;">${otp}</span>
        </div>
        <p style="font-size: 12px; color: #888; text-align: center;">Ye code 5 minute tak valid hai. Suraksha ke liye isse kisi ke saath share na karein.</p>
        <p style="font-size: 14px; color: #333; margin-top: 20px;">Good Luck!<br><b>Team BKP ESPORTS</b></p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP Sent to: ${email}`);
    res.status(200).send('Email Sent Successfully');
  } catch (error) {
    console.error("Mail Sending Error:", error);
    res.status(500).send('Mail Error: ' + error.message);
  }
});

// Port Handling: Render port 10000 use karta hai
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`BKP Server is running on port ${PORT}`);
});
