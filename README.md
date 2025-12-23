# 🎮 Interactive Metaverse Website

<div align="center">

![Gaming Platform](https://img.shields.io/badge/Platform-Gaming-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![GSAP](https://img.shields.io/badge/GSAP-3.14+-88CE02?logo=greensock)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)

**A stunning, immersive gaming metaverse landing page with advanced 3D animations**

[🌐 Live Demo](https://interactive-metaverse-website.vercel.app) • [📧 Contact](mailto:your@email.com) • [🐛 Report Bug](https://github.com/AvishkaIndu/interactive-metaverse-website/issues)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 **Frontend Magic**
- ⚡ **React 19** with modern hooks
- 🎭 **GSAP Animations** - Buttery smooth 60fps
- 🎯 **3D Hover Effects** - Interactive card animations  
- 📱 **Fully Responsive** - Mobile-first design
- 🌙 **Dark Gaming Theme** - Immersive aesthetics
- 🎪 **Scroll Animations** - Reveal on scroll effects

</td>
<td width="50%">

### ⚙️ **Backend Power**
- 🚀 **Express.js API** - RESTful endpoints
- 📊 **Real-time Stats** - Gaming statistics
- 📧 **Email Integration** - Contact & newsletter
- 🔒 **Security Features** - Rate limiting & validation
- 🌍 **CORS Support** - Cross-origin requests
- 📈 **Performance Optimized** - Fast response times

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites
![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![npm](https://img.shields.io/badge/npm-latest-red)

### Installation

```bash
# 📥 Clone the repository
git clone https://github.com/AvishkaIndu/interactive-metaverse-website.git
cd interactive-metaverse-website

# 📦 Install frontend dependencies
npm install

# 🔧 Install backend dependencies
cd server && npm install && cd ..

# 🚀 Start development servers
npm run fullstack
```

### Single Commands
```bash
# Frontend only
npm run dev        # Starts on http://localhost:5173

# Backend only  
npm run server     # Starts on http://localhost:3001

# Both together
npm run fullstack  # Runs both frontend & backend
```

---

## 🎯 Tech Stack

<div align="center">

| **Frontend** | **Backend** | **Styling** | **Animation** |
|:------------:|:-----------:|:-----------:|:-------------:|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) | ![Express](https://img.shields.io/badge/-Express-000000?logo=express) | ![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?logo=tailwind-css&logoColor=white) | ![GSAP](https://img.shields.io/badge/-GSAP-88CE02?logo=greensock&logoColor=white) |
| ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) | ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3) | ![3D Effects](https://img.shields.io/badge/-3D_Effects-FF6B6B) |

</div>

---

## 📸 Screenshots

<div align="center">

### 🏠 Hero Section
![Hero Section](./screenshots/hero-desktop.png)

*Interactive video backgrounds with smooth animations*

### 📖 Story Section  
![Story Section](./screenshots/story-bento.png)

*3D hover effects on story cards*

### 📊 Gaming Statistics
![Gaming Stats](./screenshots/gaming-stats.png)

*Real-time statistics with animated counters*

### 📱 Mobile Experience
<img src="./screenshots/mobile-view.png" width="300" alt="Mobile View">

*Fully responsive across all devices*

</div>

---

## 🎨 Key Components

### 🎭 Story Component - 3D Interactive Cards
```jsx
// Real-time mouse tracking for 3D effects
const handleMouseMove = (e) => {
  const rotateX = ((y - centerY) / centerY) * 5;
  const rotateY = ((x - centerX) / centerX) * -5;
  
  gsap.to(element, {
    duration: 0.1,
    rotateX, rotateY,
    ease: 'power1.out'
  });
}
```

### ⚡ Animation Features
```jsx
// Scroll-triggered animations
useGSAP(() => {
  gsap.from('.story-bento-card', {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 50, opacity: 0,
    duration: 0.8, stagger: 0.2
  });
});
```

---

## 🛠️ Project Structure

```
📁 interactive-metaverse-website/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 🎯 Hero.jsx           # Landing section
│   │   ├── 📖 Story.jsx          # 3D story cards
│   │   ├── 📊 GameStats.jsx      # Live statistics
│   │   ├── 📞 Contact.jsx        # Contact form
│   │   ├── 🦶 Footer.jsx         # Footer section
│   │   └── 🧩 AnimatedTitle.jsx  # Text animations
│   ├── 🎨 index.css             # Global styles
│   └── ⚛️ App.jsx               # Main component
├── 📁 server/
│   ├── 🚀 server.js             # Express API
│   ├── 📦 package.json          # Backend deps
│   └── 🔒 .env.example          # Environment template
├── 📁 public/
│   ├── 🎬 videos/               # Background videos
│   ├── 🖼️ img/                  # Image assets
│   └── 🔤 fonts/                # Custom fonts
└── 📚 README.md                 # This file
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Status |
|:------:|:---------|:------------|:-------|
| `GET` | `/api/health` | Health check | ✅ Active |
| `GET` | `/api/stats` | Gaming statistics | ✅ Active |
| `POST` | `/api/contact` | Contact form | ✅ Active |
| `POST` | `/api/newsletter` | Newsletter signup | ✅ Active |
| `GET` | `/api/leaderboard` | Top players | ✅ Active |

---

## ⚙️ Configuration

### Frontend Environment
```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Metagame Platform
```

### Backend Environment  
```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🎯 Performance Features

<div align="center">

| Feature | Description | Benefit |
|:-------:|:------------|:--------|
| 🎪 **GSAP Animations** | Hardware-accelerated | Smooth 60fps |
| 📱 **Responsive Design** | Mobile-first approach | Perfect on all devices |
| ⚡ **Optimized Assets** | WebP images, compressed videos | Fast loading |
| 🔄 **Lazy Loading** | Content loads on demand | Improved performance |
| 📊 **Real-time API** | Live statistics updates | Dynamic content |

</div>

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Railway)
```bash
railway login
railway init
railway up
```

### Environment Variables
Set these in your deployment platform:
- `NODE_ENV=production`
- `FRONTEND_URL=https://your-frontend-url.com`
- Email credentials for contact forms

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. ✅ **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 🚀 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔄 **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

<div align="center">

**Built with ❤️ by [AvishkaIndu](https://github.com/AvishkaIndu)**

![GSAP](https://img.shields.io/badge/Thanks_to-GSAP-88CE02?logo=greensock)
![React](https://img.shields.io/badge/Thanks_to-React_Team-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Thanks_to-Tailwind_CSS-38B2AC?logo=tailwind-css)

⭐ **Star this repo if you found it helpful!** ⭐

[🐛 Report Issues](https://github.com/AvishkaIndu/interactive-metaverse-website/issues) • [💡 Request Features](https://github.com/AvishkaIndu/interactive-metaverse-website/issues/new) • [📧 Contact Dev](mailto:your@email.com)

</div>
#   i n t e r a c t i v e - m e t a v e r s e - w e b s i t e 
 
 