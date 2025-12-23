# 🎮 Interactive Metaverse Website

![Gaming Platform](https://img.shields.io/badge/Platform-Gaming-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![GSAP](https://img.shields.io/badge/GSAP-3.14+-88CE02?logo=greensock)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)

**A stunning, immersive gaming metaverse landing page with advanced 3D animations**

🌐 [Live Demo](https://your-demo-url.com) •  
📧 [Contact](mailto:your@email.com) •  
🐛 [Report Bug](https://github.com/AvishkaIndu/interactive-metaverse-website/issues)

---

## ✨ Features

### 🎨 Frontend Magic
- ⚡ React 19 with modern hooks
- 🎭 GSAP animations (smooth 60fps)
- 🎯 3D hover & tilt effects
- 📱 Fully responsive (mobile-first)
- 🌙 Dark gaming theme
- 🎪 Scroll-triggered animations

### ⚙️ Backend Power
- 🚀 Express.js REST API
- 📊 Real-time gaming statistics
- 📧 Email & newsletter integration
- 🔒 Rate limiting & validation
- 🌍 CORS enabled
- 📈 Performance optimized

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm (latest)

### Installation

```bash
# Clone the repository
git clone https://github.com/AvishkaIndu/interactive-metaverse-website.git
cd interactive-metaverse-website

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..

# Start frontend + backend
npm run fullstack
Single Commands
bash
Copy code
# Frontend only
npm run dev
# http://localhost:5173

# Backend only
npm run server
# http://localhost:3001

# Both together
npm run fullstack
🎯 Tech Stack
Frontend	Backend	Styling	Animation
React	Express	Tailwind CSS	GSAP
JavaScript	Node.js	CSS3	3D Effects

📸 Screenshots
🏠 Hero Section


Interactive video backgrounds with smooth animations

📖 Story Section


3D hover effects on story cards

📊 Gaming Statistics


Real-time statistics with animated counters

📱 Mobile Experience
Fully responsive across all devices

🎨 Key Components
🎭 Story Component – 3D Cards
jsx
Copy code
const handleMouseMove = (e) => {
  const rotateX = ((y - centerY) / centerY) * 5;
  const rotateY = ((x - centerX) / centerX) * -5;

  gsap.to(element, {
    duration: 0.1,
    rotateX,
    rotateY,
    ease: "power1.out",
  });
};
⚡ Scroll Animations
jsx
Copy code
useGSAP(() => {
  gsap.from(".story-bento-card", {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
  });
});
🛠️ Project Structure
pgsql
Copy code
interactive-metaverse-website/
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── Story.jsx
│   │   ├── GameStats.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── AnimatedTitle.jsx
│   ├── index.css
│   └── App.jsx
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── public/
│   ├── videos/
│   ├── img/
│   └── fonts/
└── README.md
🌐 API Endpoints
Method	Endpoint	Description
GET	/api/health	Health check
GET	/api/stats	Gaming statistics
POST	/api/contact	Contact form
POST	/api/newsletter	Newsletter signup
GET	/api/leaderboard	Top players

⚙️ Configuration
Frontend .env
env
Copy code
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Metagame Platform
Backend .env
env
Copy code
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
🚀 Deployment
Frontend (Vercel)
bash
Copy code
npm run build
vercel --prod
Backend (Railway)
bash
Copy code
railway login
railway init
railway up
🤝 Contributing
Fork the repo 🍴

Create a branch (git checkout -b feature/new-feature)

Commit changes (git commit -m "Add new feature")

Push (git push origin feature/new-feature)

Open a Pull Request 🔄

📄 License
Licensed under the MIT License.
See the LICENSE file for details.

🙏 Acknowledgments
Built with ❤️ by AvishkaIndu

Thanks to:

GSAP

React Team

Tailwind CSS

⭐ Star this repo if you like it! ⭐

yaml
Copy code

---

If you want:
- 🔥 **shorter README**
- 🎯 **portfolio-style README**
- 🧩 **add badges / stats / GIFs**
- 📝 **SEO-optimized GitHub description**

Just tell me 👍
