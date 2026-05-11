const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. Home Route (Check karne ke liye ki server on hai)
app.get('/', (req, res) => {
  res.send('BKP Server is Online and Ready!');
});

// 2. OTP Sender Route
app.get('/send-otp', async (req, res) => {
  const { email, otp } = req.query;

  if (!email || !otp) {
    return res.status(400).send('Missing email or otp');
  }

  // Transporter (Gmail Setup)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'bkptournament@gmail.com',
      pass: 'aglo dmyb jgew ygkv' // Check karein ye password sahi hai
    }
  });

  const mailOptions = {
    from: '"BKP ESPORTS" <bkptournament@gmail.com>',
    to: email,
    subject: 'OTP Code: ' + otp,
    text: 'Aapka OTP code hai: ' + otp,
    html: `<b>Namaste Warrior!</b><br><br>Aapka OTP code hai: <h1>${otp}</h1>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email Sent Successfully');
  } catch (error) {
    console.error('Mail Error:', error);
    res.status(500).send('Mail Error: ' + error.message);
  }
});

// ZAROORI: Render ke liye port setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
