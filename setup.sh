#!/bin/bash
# Quick setup script for the fullstack application

echo "🚀 Setting up Metagame Fullstack Application..."

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies  
echo "📦 Installing backend dependencies..."
cd server
npm install

# Copy environment template
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "📄 Created .env file from template"
    echo "⚠️  Please configure your email settings in server/.env if you want email functionality"
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "🎮 To start the application:"
echo "1. Backend: cd server && npm start"
echo "2. Frontend: npm run dev (in a new terminal)"
echo ""
echo "📡 API will run on: http://localhost:3001"
echo "🌐 Frontend will run on: http://localhost:5173"
echo ""
echo "Happy coding! 🎯"