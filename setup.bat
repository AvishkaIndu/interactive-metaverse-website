@echo off
REM Quick setup script for Windows

echo 🚀 Setting up Metagame Fullstack Application...
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
call npm install

REM Install backend dependencies  
echo 📦 Installing backend dependencies...
cd server
call npm install

REM Copy environment template
if not exist ".env" (
    copy .env.example .env > nul
    echo 📄 Created .env file from template
    echo ⚠️  Please configure your email settings in server/.env if you want email functionality
)

cd ..

echo.
echo ✅ Setup complete!
echo.
echo 🎮 To start the application:
echo 1. Backend: cd server ^&^& npm start
echo 2. Frontend: npm run dev ^(in a new terminal^)
echo.
echo 📡 API will run on: http://localhost:3001
echo 🌐 Frontend will run on: http://localhost:5173
echo.
echo Happy coding! 🎯

pause