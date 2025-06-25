# Local Supabase Database Setup

This guide helps you set up your local Supabase database and connect to the shared team database for the InCourse project.

## 🚀 Quick Setup for New Developers

### **Prerequisites**

Make sure you have these installed:

- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)
- [Docker](https://docs.docker.com/get-docker/) (for local development)

```bash
# Install Supabase CLI (macOS)
brew install supabase/tap/supabase

# Install Supabase JavaScript client
npm install @supabase/supabase-js
```

### **Initial Setup**

```bash
# 1. Clone the repository (if not done already)
git clone <repository-url>
cd incourse

# 2. Install dependencies
npm install

# 3. Start local development environment
supabase start

# 4. Copy environment template and update values
cp .env.local.example .env.local
# Edit .env.local with your values (see Environment Setup section)
```

### **Connecting to Shared Team Database**

```bash
# 1. Login to Supabase (one-time setup)
supabase login

# 2. Link to the shared InCourse project
supabase link --project-ref kcduzlbadhzeulhzslvj

# 3. Pull latest schema from cloud (if needed)
supabase db pull

# 4. Generate TypeScript types
supabase gen types typescript --project-ref kcduzlbadhzeulhzslvj > types/supabase.ts
```

### **Environment Setup**

Create a `.env.local` file in the project root:

```env
# Local Development (when using supabase start)
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=<your-local-anon-key>

# Production/Shared Cloud (for testing with shared data)
# SUPABASE_URL=https://kcduzlbadhzeulhzslvj.supabase.co
# SUPABASE_ANON_KEY=<shared-project-anon-key>

# Optional: Service role key (keep secret!)
# SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

The anon key will be displayed when you run `supabase start`.

## Daily Development Workflow

```bash
# Start your development day
supabase start              # Starts local database
npm run dev                 # Starts your frontend

# When done for the day
supabase stop              # Stops local database
```

## Local Services Access

After starting `supabase start`, you'll have access to:

- **Database**: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`
- **API URL**: `http://127.0.0.1:54321`
- **Studio**: `http://127.0.0.1:54323`
- **Inbucket (Email testing)**: `http://127.0.0.1:54324`

## Staying in Sync with Team Changes

When team members make database changes:

```bash
# 1. Pull latest code
git pull

# 2. Apply new migrations locally
supabase db reset

# 3. Regenerate TypeScript types (if schema changed)
supabase gen types typescript --local > types/supabase.ts

# 4. Restart your development server
npm run dev
```

## Common Commands

```bash
# Development Commands
supabase start              # Start local database
supabase stop               # Stop local database
supabase status             # Check service status
supabase db reset           # Reset local database (applies all migrations)

# Schema Management
supabase db push                        # Push migrations to cloud
supabase db pull                        # Pull schema from cloud

# Type Generation
supabase gen types typescript --local > types/supabase.ts                    # Local types
supabase gen types typescript --project-ref kcduzlbadhzeulhzslvj > types/supabase.ts  # Cloud types

# Project Management
supabase projects list                  # List your projects
supabase link --project-ref kcduzlbadhzeulhzslvj       # Link to cloud project
```

## Troubleshooting Common Issues

### **🐳 Docker Issues**

**Problem**: "Cannot connect to Docker daemon"

```bash
# Solution: Start Docker Desktop first
open -a Docker

# Wait for Docker to start, then try again
supabase start
```

**Problem**: "Port already in use"

```bash
# Solution: Stop conflicting services
supabase stop
docker ps  # Check for running containers
# Kill any conflicting processes

# Or modify ports in supabase/config.toml
```

### **🔗 Project Linking Issues**

**Problem**: "Cannot find project ref"

```bash
# Solution: Login and link again
supabase login
supabase projects list
supabase link --project-ref kcduzlbadhzeulhzslvj
```

**Problem**: "project is paused"

```bash
# Solution: Go to Supabase dashboard and unpause the project
# https://supabase.com/dashboard/project/kcduzlbadhzeulhzslvj
# Click "Resume" or "Unpause" button
```

### **📄 Migration Errors**

**Problem**: Migration fails to apply

```bash
# Solution: Check SQL syntax and dependencies
supabase db reset  # Reapply all migrations

# If specific migration fails, edit the file:
# supabase/migrations/XXXXX_migration_name.sql
```

**Problem**: "schema_migrations already exists"

```bash
# This is normal - just continue with the migration process
# The error indicates the migration system is already set up
```

### **🏷️ TypeScript Type Errors**

**Problem**: Import errors or type mismatches

```bash
# Solution: Regenerate types after schema changes
supabase gen types typescript --local > types/supabase.ts

# Or from cloud:
supabase gen types typescript --project-ref kcduzlbadhzeulhzslvj > types/supabase.ts
```

**Problem**: "Missing SUPABASE_URL environment variable"

```bash
# Solution: Copy and configure environment file
cp .env.local.example .env.local
# Edit .env.local with correct values
```

### **🔄 Team Sync Issues**

**Problem**: "My database doesn't match teammate's"

```bash
# Solution: Reset local database to latest migrations
git pull                    # Get latest migrations
supabase db reset          # Apply all migrations
supabase gen types typescript --local > types/supabase.ts
```

**Problem**: "Untracked supabase.ts file"

```bash
# Solution: Add and commit the file
git add frontend/src/lib/supabase.ts
git commit -m "chore: add supabase client and types for frontend"
git push
```

### **🌐 Connection Issues**

**Problem**: "Failed to connect to postgres"

```bash
# Solution: Check if local Supabase is running
supabase status

# If not running, start it:
supabase start

# If still having issues, restart everything:
supabase stop
supabase start
```

**Problem**: "Tenant or user not found"

```bash
# Solution: This usually means the project is paused or you're not linked correctly
# 1. Check if project is paused in dashboard
# 2. Re-link to the project:
supabase link --project-ref kcduzlbadhzeulhzslvj
```

### **🔄 Database Reset Issues**

**Problem**: "Cannot reset database"

```bash
# Solution: Stop and restart Supabase completely
supabase stop
supabase start
supabase db reset
```

## Getting Help

1. **Check Supabase Status**: `supabase status`
2. **View Logs**: Check terminal output for error messages
3. **Reset Everything**: `supabase stop && supabase start`
4. **Team Chat**: Ask teammates if they've seen similar issues
5. **Supabase Docs**: https://supabase.com/docs

## Quick Reference

| Command                                                     | Purpose                                       |
| ----------------------------------------------------------- | --------------------------------------------- |
| `supabase start`                                            | Start local database                          |
| `supabase stop`                                             | Stop local database                           |
| `supabase status`                                           | Check if services are running                 |
| `supabase db reset`                                         | Reset local database and apply all migrations |
| `supabase db pull`                                          | Pull latest schema from cloud                 |
| `supabase gen types typescript --local > types/supabase.ts` | Generate TypeScript types from local DB       |
| `supabase link --project-ref kcduzlbadhzeulhzslvj`          | Link to shared team project                   |
