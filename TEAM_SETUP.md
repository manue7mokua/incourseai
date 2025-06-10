# 🚀 InCourse Team Setup Guide

Welcome to the InCourse project! This guide will help you get set up quickly and start contributing.

## 📋 Prerequisites Checklist

Before you start, make sure you have:

- [ ] **Git** installed and configured
- [ ] **Node.js** (v18 or higher) and **npm**
- [ ] **Docker Desktop** installed and running
- [ ] **Code editor** (Cursor recommended)
- [ ] **Terminal/Command Line** access

## 🏁 Quick Setup (15 minutes)

### **Step 1: Clone and Install**

```bash
# Clone the repository
git clone <repository-url>
cd incourse

# Install project dependencies
npm install
cd frontend && npm install && cd ..

# Install Supabase CLI
brew install supabase/tap/supabase  # macOS
# Windows/Linux: https://supabase.com/docs/guides/cli/getting-started
```

### **Step 2: Environment Setup**

```bash
# Copy environment template
cp .env.local.example .env.local

# The file will contain local development defaults
# You don't need to change anything for local development
```

### **Step 3: Start Local Database**

```bash
# Start Docker Desktop first (if not running)
open -a Docker

# Start Supabase local development stack
supabase start

# ✅ This creates a complete local database with all our tables
# ✅ You'll see output with local URLs and API keys
```

### **Step 4: Verify Setup**

```bash
# Check that services are running
supabase status

# Should show:
# ✅ API URL: http://127.0.0.1:54321
# ✅ Studio URL: http://127.0.0.1:54323
# ✅ Database running
```

### **Step 5: Start Development**

```bash
# Start the frontend application
cd frontend
npm run dev

# Your app should now be running at http://localhost:3000
# Database admin interface at http://127.0.0.1:54323
```

## 🔗 Connecting to Shared Cloud Database

### **Option A: For Testing with Shared Data**

Sometimes you'll want to test with real data or shared features:

```bash
# 1. Login to Supabase
supabase login

# 2. Link to our shared project
supabase link --project-ref kcduzlbadhzeulhzslvj

# 3. Update your .env.local file:
# Uncomment the cloud database lines:
# SUPABASE_URL=https://kcduzlbadhzeulhzslvj.supabase.co
# SUPABASE_ANON_KEY=<cloud-anon-key>

# 4. Get the cloud anon key from:
# https://supabase.com/dashboard/project/kcduzlbadhzeulhzslvj/settings/api

# 5. Restart your development server
npm run dev
```

### **Option B: For Production Deployment**

When deploying to production, use the cloud database exclusively.

## 🛠️ Development Workflow

### **Daily Routine**

```bash
# 🌅 Start of day
git pull                    # Get latest changes
supabase start             # Start local database
npm run dev                # Start frontend

# 🌙 End of day
supabase stop              # Stop local database (saves resources)
```

### **When Database Schema Changes**

```bash
# When teammates add new tables/columns:
git pull                                              # Get new migration files
supabase db reset                                    # Apply all migrations
supabase gen types typescript --local > types/supabase.ts  # Update types
npm run dev                                          # Restart app
```

### **Making Your Own Database Changes**

```bash
# 1. Create a migration
supabase migration new add_my_feature

# 2. Edit the generated file in supabase/migrations/
# Add your SQL changes

# 3. Test locally
supabase db reset

# 4. If it works, commit and push
git add supabase/migrations/
git commit -m "feat: add my feature to database"
git push
```

## 📚 Understanding the Database

Our database has these main table groups:

### **👥 User Management**

- `users` - User profiles
- `enrollments` - Who's enrolled in what courses

### **📖 Course Content**

- `courses` - Course information
- `modules` - Course sections/chapters
- `module_items` - Individual content pieces
- `files` - File attachments and documents

### **🧠 Study Tools**

- `flashcard_decks` & `flashcard_items` - Flashcard system
- `quizzes`, `quiz_questions` & `quiz_attempts` - Quiz system

### **🔗 Relationships**

- `flashcard_deck_modules` - Links flashcards to course modules
- `quiz_modules` - Links quizzes to course modules

## 🆘 Common Issues & Solutions

### **"Cannot connect to Docker daemon"**

```bash
# Start Docker Desktop
open -a Docker
# Wait 30 seconds, then try: supabase start
```

### **"Port already in use"**

```bash
# Stop Supabase and try again
supabase stop
supabase start
```

### **"Missing environment variables"**

```bash
# Make sure you copied the template
cp .env.local.example .env.local
```

### **"Database doesn't match teammates"**

```bash
# Reset to latest migrations
git pull
supabase db reset
```

### **"TypeScript errors"**

```bash
# Regenerate types after database changes
supabase gen types typescript --local > types/supabase.ts
```

## 🔍 Useful Commands

```bash
# Database Management
supabase start              # Start local database
supabase stop               # Stop local database
supabase status             # Check what's running
supabase db reset           # Fresh database with all migrations

# Development
npm run dev                 # Start frontend
npm run build               # Build for production
npm run lint                # Check code quality

# Database Inspection
open http://127.0.0.1:54323 # Database admin interface
supabase logs               # View database logs
```

## 🎯 Next Steps

1. **Explore the Database**: Visit http://127.0.0.1:54323 and browse the tables
2. **Read the Code**: Look at `supabase/client.ts` for database connection setup
3. **Check the Schema**: Review `supabase/migrations/` to understand database structure
4. **Start Coding**: Pick up a task and start building!

## 📞 Need Help?

- **Database Issues**: Check `supabase/README.md` for detailed documentation
- **Frontend Issues**: Look in `frontend/` directory for specific guides
- **Bugs**: Create an issue in our project repository

Welcome to the team! 🎉
