import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.'
});

app.use(limiter);

// Email transporter (configure based on your email provider)
const createEmailTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// In-memory data storage (replace with database in production)
const users = [];
const contactSubmissions = [];
const gameStats = {
  activePlayers: 10234567,
  dailyMatches: 532189,
  gameTitles: 1247,
  countries: 67
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Game statistics
app.get('/api/stats', (req, res) => {
  // Simulate real-time updates
  const stats = {
    ...gameStats,
    activePlayers: gameStats.activePlayers + Math.floor(Math.random() * 1000),
    dailyMatches: gameStats.dailyMatches + Math.floor(Math.random() * 100),
    onlineNow: Math.floor(Math.random() * 50000) + 10000
  };
  
  res.json(stats);
});

// User registration/newsletter signup
app.post('/api/newsletter', [
  body('email').isEmail().normalizeEmail(),
  body('name').optional().isLength({ min: 1, max: 100 }).trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name } = req.body;
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Email already subscribed to newsletter' 
      });
    }

    // Add to newsletter
    const user = {
      id: users.length + 1,
      email,
      name: name || '',
      subscribedAt: new Date().toISOString(),
      isActive: true
    };

    users.push(user);

    // Send welcome email (if SMTP is configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createEmailTransporter();
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@metagame.io',
          to: email,
          subject: 'Welcome to Metagame!',
          html: `
            <h2>Welcome to the future of gaming!</h2>
            <p>Hi ${name || 'Gamer'},</p>
            <p>Thanks for subscribing to our newsletter. You'll be the first to know about:</p>
            <ul>
              <li>New game releases</li>
              <li>Exclusive tournaments</li>
              <li>Community events</li>
              <li>Platform updates</li>
            </ul>
            <p>Get ready for an epic gaming adventure!</p>
            <p>Best regards,<br>The Metagame Team</p>
          `
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    res.status(201).json({ 
      message: 'Successfully subscribed to newsletter!',
      user: { id: user.id, email: user.email, name: user.name }
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact form submission
app.post('/api/contact', contactLimiter, [
  body('name').isLength({ min: 1, max: 100 }).trim(),
  body('email').isEmail().normalizeEmail(),
  body('subject').optional().isLength({ min: 1, max: 200 }).trim(),
  body('message').isLength({ min: 10, max: 2000 }).trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;
    
    const submission = {
      id: contactSubmissions.length + 1,
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      submittedAt: new Date().toISOString(),
      status: 'new',
      ip: req.ip
    };

    contactSubmissions.push(submission);

    // Send notification email (if SMTP is configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createEmailTransporter();
        
        // Send confirmation to user
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@metagame.io',
          to: email,
          subject: 'We received your message',
          html: `
            <h2>Thanks for contacting us!</h2>
            <p>Hi ${name},</p>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <h3>Your Message:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p>Best regards,<br>The Metagame Team</p>
          `
        });

        // Send notification to admin
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@metagame.io',
          to: process.env.ADMIN_EMAIL || 'admin@metagame.io',
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p><strong>Submitted:</strong> ${submission.submittedAt}</p>
            <p><strong>IP:</strong> ${req.ip}</p>
          `
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    res.status(201).json({ 
      message: 'Message sent successfully! We\'ll get back to you soon.',
      submissionId: submission.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get leaderboard data
app.get('/api/leaderboard', (req, res) => {
  const mockLeaderboard = [
    { rank: 1, username: 'ProGamer2024', score: 98750, level: 87, country: 'US' },
    { rank: 2, username: 'EliteWarrior', score: 94320, level: 82, country: 'UK' },
    { rank: 3, username: 'GameMaster99', score: 91580, level: 79, country: 'DE' },
    { rank: 4, username: 'PixelHunter', score: 89240, level: 76, country: 'JP' },
    { rank: 5, username: 'CyberNinja', score: 87650, level: 74, country: 'CA' },
  ];

  res.json(mockLeaderboard);
});

// Get featured games
app.get('/api/games/featured', (req, res) => {
  const featuredGames = [
    {
      id: 1,
      title: 'Radiant Realms',
      description: 'Experience the future of gaming with blockchain technology',
      thumbnail: '/img/game1.webp',
      category: 'RPG',
      rating: 4.8,
      players: '2.1M'
    },
    {
      id: 2,
      title: 'Nexus Battles',
      description: 'Intense multiplayer battles in virtual arenas',
      thumbnail: '/img/game2.webp',
      category: 'FPS',
      rating: 4.6,
      players: '1.8M'
    },
    {
      id: 3,
      title: 'Vault Explorers',
      description: 'Discover hidden treasures in mysterious vaults',
      thumbnail: '/img/game3.webp',
      category: 'Adventure',
      rating: 4.7,
      players: '950K'
    }
  ];

  res.json(featuredGames);
});

// Tournament API
app.get('/api/tournaments', (req, res) => {
  const tournaments = [
    {
      id: 1,
      name: 'Global Championship 2024',
      game: 'Radiant Realms',
      prizePool: '$100,000',
      startDate: '2024-01-15',
      participants: 2048,
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Nexus Arena Masters',
      game: 'Nexus Battles',
      prizePool: '$50,000',
      startDate: '2024-01-20',
      participants: 1024,
      status: 'registration'
    }
  ];

  res.json(tournaments);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { details: error.message })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Email configured: ${process.env.SMTP_USER ? '✅' : '❌'}`);
});

export default app;