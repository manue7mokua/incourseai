# InCourse Development Setup

This document explains how to set up and run the InCourse development environment.

## 🚀 Quick Start

### Start All Services

```bash
./start-dev.sh
```

This single command will:

- Start Docker Desktop (if not running)
- Start Supabase local development environment
- Start the FastAPI backend on port 8000
- Start the Next.js frontend on port 3000
- Test Canvas integration
- Display all service URLs

### Stop All Services

```bash
./stop-dev.sh
```

This will cleanly stop all running services.

## 📋 Prerequisites

Before running the development environment, ensure you have:

1. **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
2. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
3. **Python 3** (v3.9 or higher) - [Download here](https://www.python.org/downloads/)
4. **Supabase CLI** - Install with: `npm install -g supabase`

## 🏗️ Architecture

The development environment consists of:

- **Frontend**: Next.js 15 with TypeScript (port 3000)
- **Backend**: FastAPI with Python (port 8000)
- **Database**: Supabase local development (port 54321)
- **Canvas Integration**: Direct API calls to Howard University Canvas

## 🔧 Manual Setup (if needed)

If the automated script doesn't work, you can start services manually:

### 1. Start Supabase

```bash
cd supabase
supabase start
cd ..
```

### 2. Start Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
```

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Service URLs

Once all services are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Supabase Dashboard**: http://localhost:54321
- **Courses Page**: http://localhost:3000/courses

## 🔑 Environment Configuration

### Backend Environment

Create `backend/.env` with:

```env
CANVAS_API_BASE_URL=https://howard.instructure.com/api/v1
CANVAS_API_KEY=your_canvas_api_key_here
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Frontend Environment

Create `frontend/.env.local` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🐛 Troubleshooting

### Port Already in Use

If you get "Address already in use" errors:

```bash
./stop-dev.sh
./start-dev.sh
```

### Docker Issues

If Docker fails to start:

1. Open Docker Desktop manually
2. Wait for it to fully start
3. Run `./start-dev.sh` again

### Canvas Integration Issues

If Canvas integration fails:

1. Check your Canvas API key in `backend/.env`
2. Verify the Canvas URL is correct
3. Test the connection: `curl -X POST http://localhost:8000/api/lms/test-connection`

### Database Issues

If Supabase fails to start:

```bash
cd supabase
supabase stop
supabase start
```

## 📝 Development Notes

- The backend uses lazy database initialization to avoid Supabase errors when not needed
- Canvas integration fetches data directly without storing in the database
- All services include hot reload for development
- The frontend automatically connects to the backend API

## 🆘 Getting Help

If you encounter issues:

1. Check the terminal output for error messages
2. Verify all prerequisites are installed
3. Ensure ports 3000, 8000, and 54321 are available
4. Check the service URLs in your browser
