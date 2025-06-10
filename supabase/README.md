# Supabase Database Setup

This directory contains the Supabase configuration and database schema for the incourse application.

## 🚀 Quick Setup for Team Members

### **New Developer Setup**

If you're a new team member setting up this project, follow these steps:

```bash
# 1. Clone the repository (if not done already)
git clone <repository-url>
cd incourse

# 2. Install dependencies
npm install

# 3. Install Supabase CLI
brew install supabase/tap/supabase  # macOS
# OR follow: https://supabase.com/docs/guides/cli/getting-started

# 4. Start local development environment
supabase start

# 5. Copy environment template and update values
cp .env.local.example .env.local
# Edit .env.local with your values (see Environment Setup section)
```

### **Connecting to Shared Cloud Database**

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

### **Daily Development Workflow**

```bash
# Start your development day
supabase start              # Starts local database
npm run dev                 # Starts your frontend

# When done for the day
supabase stop              # Stops local database
```

## Prerequisites

Make sure you have the following installed:

- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)
- [Docker](https://docs.docker.com/get-docker/) (for local development)
- [@supabase/supabase-js](https://www.npmjs.com/package/@supabase/supabase-js) package

### Installation Commands

If not already installed:

```bash
# Install Supabase CLI (macOS)
brew install supabase/tap/supabase

# Install Supabase JavaScript client
npm install @supabase/supabase-js
```

## Local Development Setup

### 1. Start Local Supabase

Run the following command from the project root:

```bash
# Start all Supabase services locally
supabase start
```

This will:

- Start a local PostgreSQL database
- Launch Supabase Studio (web interface)
- Set up authentication services
- Apply all migrations from `supabase/migrations/`

### 2. Access Local Services

After starting, you'll have access to:

- **Database**: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`
- **API URL**: `http://127.0.0.1:54321`
- **Studio**: `http://127.0.0.1:54323`
- **Inbucket (Email testing)**: `http://127.0.0.1:54324`

### 3. Environment Variables

Update your `.env.local` file with the local development values:

```env
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=<your-local-anon-key>
```

The anon key will be displayed when you run `supabase start`.

### 4. Generate TypeScript Types

Generate TypeScript types from your local database:

```bash
# From the project root
supabase gen types typescript --local > types/supabase.ts
```

## Database Schema

The database now includes comprehensive tables for a full LMS integration:

### Core Tables

#### Users Table

- `id` (UUID, Primary Key)
- `full_name` (Text, Required)
- `email` (Text, Unique, Required)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### Courses Table

- `id` (UUID, Primary Key)
- `lms_id` (Text, Optional) - LMS identifier for integration
- `lms_provider` (Text, Default: 'canvas') - LMS provider name
- `name` (Text, Required)
- `code` (Text, Optional) - Course code (e.g., "CS 101")
- `instructor` (Text, Required)
- `description` (Text, Optional)
- `semester` (Text, Optional)
- `year` (Text, Optional)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### Enrollments Table

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users.id)
- `course_id` (UUID, Foreign Key → courses.id)
- `enrolled_at` (Timestamp)
- `status` (Text: 'active', 'completed', 'dropped')

### Course Content Tables

#### Modules Table

- `id` (UUID, Primary Key)
- `lms_id` (Text, Optional) - LMS module identifier
- `course_id` (UUID, Foreign Key → courses.id)
- `name` (Text, Required)
- `description` (Text, Optional)
- `items_count` (Integer, Auto-maintained)
- `position` (Integer, Default: 0)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### Module Items Table

- `id` (UUID, Primary Key)
- `lms_id` (Text, Optional) - LMS item identifier
- `lms_content_id` (Text, Optional) - LMS content identifier
- `name` (Text, Required)
- `module_id` (UUID, Foreign Key → modules.id)
- `course_id` (UUID, Foreign Key → courses.id)
- `type` (Text, Enum: 'file', 'page', 'discussion', 'assignment', 'quiz', 'external_url', 'external_tool')
- `url` (Text, Optional)
- `position` (Integer, Default: 0)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Study Tools Tables

#### Flashcard Decks Table

- `id` (UUID, Primary Key)
- `course_id` (UUID, Foreign Key → courses.id)
- `name` (Text, Required)
- `description` (Text, Optional)
- `items_count` (Integer, Auto-maintained)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### Flashcard Items Table

- `id` (UUID, Primary Key)
- `deck_id` (UUID, Foreign Key → flashcard_decks.id)
- `question` (Text, Required)
- `answer` (Text, Required)
- `position` (Integer, Default: 0)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### Quizzes Table

- `id` (UUID, Primary Key)
- `course_id` (UUID, Foreign Key → courses.id)
- `name` (Text, Required)
- `description` (Text, Optional)
- `items_count` (Integer, Auto-maintained)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### Quiz Questions Table

- `id` (UUID, Primary Key)
- `quiz_id` (UUID, Foreign Key → quizzes.id)
- `question` (Text, Required)
- `options` (JSONB, Array of options)
- `correct_option` (Integer, Required)
- `explanation` (Text, Optional)
- `position` (Integer, Default: 0)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

#### Quiz Attempts Table

- `id` (UUID, Primary Key)
- `quiz_id` (UUID, Foreign Key → quizzes.id)
- `user_id` (UUID, Foreign Key → users.id)
- `score` (Integer, Default: 0)
- `total_questions` (Integer, Default: 0)
- `completed_at` (Timestamp)
- `answers` (JSONB, User's answers)

### File Management Table

#### Files Table

- `id` (UUID, Primary Key)
- `canvas_id` (Text, Optional) - Canvas file identifier
- `name` (Text, Required)
- `size` (BigInt, Default: 0)
- `type` (Text, Optional) - MIME type
- `url` (Text, Optional)
- `course_id` (UUID, Optional, Foreign Key → courses.id)
- `module_item_id` (UUID, Optional, Foreign Key → module_items.id)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Junction Tables

- `flashcard_deck_modules` - Links flashcard decks to modules (many-to-many)
- `quiz_modules` - Links quizzes to modules (many-to-many)

## Row Level Security (RLS)

All tables have RLS enabled with the following policies:

### Core Tables

- **Users**: Can only view/update their own profile
- **Courses**: Public read access for all users
- **Enrollments**: Users can only view/manage their own enrollments

### Course Content Tables

- **Modules**: Users can view modules for courses they're enrolled in
- **Module Items**: Users can view module items for courses they're enrolled in
- **Files**: Users can view files for courses they're enrolled in

### Study Tools Tables

- **Flashcard Decks**: Users can view/create/manage flashcard decks for enrolled courses
- **Flashcard Items**: Users can manage flashcard items for decks in enrolled courses
- **Quizzes**: Users can view quizzes for courses they're enrolled in
- **Quiz Questions**: Users can view quiz questions for enrolled courses
- **Quiz Attempts**: Users can only view/create their own quiz attempts

### Advanced Features

- **Auto-maintained counts**: Module, flashcard deck, and quiz item counts are automatically updated via triggers
- **Position ordering**: Items within modules, flashcard decks, and quizzes maintain position for proper ordering
- **LMS Integration**: Support for Canvas and other LMS providers with identifier mapping

## Team Collaboration & Database Management

### **Making Schema Changes**

When you need to modify the database schema:

```bash
# 1. Create a new migration (describe your change)
supabase migration new add_user_preferences_table

# 2. Edit the generated migration file in supabase/migrations/
# Add your SQL changes

# 3. Apply locally first (test your changes)
supabase db reset

# 4. If everything works, push to shared cloud database
supabase db push

# 5. Commit and push your migration file
git add supabase/migrations/
git commit -m "feat: add user preferences table"
git push
```

### **Staying in Sync with Team Changes**

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

### **Working with Shared Cloud Data**

```bash
# Switch to cloud database for testing
# Update .env.local to use cloud URLs

# Pull fresh data from cloud (⚠️ destroys local data)
supabase db pull --linked

# Push local changes to cloud (⚠️ careful!)
supabase db push
```

## Common Commands

```bash
# Development Commands
supabase start              # Start local database
supabase stop               # Stop local database
supabase status             # Check service status
supabase db reset           # Reset local database (applies all migrations)

# Schema Management
supabase migration new <name>           # Create new migration
supabase db push                        # Push migrations to cloud
supabase db pull                        # Pull schema from cloud

# Type Generation
supabase gen types typescript --local > types/supabase.ts                    # Local types
supabase gen types typescript --project-ref kcduzlbadhzeulhzslvj > types/supabase.ts  # Cloud types

# Project Management
supabase projects list                  # List your projects
supabase link --project-ref <ref>       # Link to cloud project
```

## Production Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Update your `.env.local` with production values:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-production-anon-key
   ```
3. Apply migrations to production:
   ```bash
   supabase db push
   ```

## Usage in Code

Import and use the Supabase client:

```typescript
import {
  supabase,
  type User,
  type Course,
  type Module,
  type FlashcardDeck,
  type Quiz,
  type CourseWithModules,
} from "./supabase/client";

// Example: Fetch all courses
const { data: courses, error } = await supabase.from("courses").select("*");

// Example: Fetch course with modules and items
const { data: courseWithModules, error } = await supabase
  .from("courses")
  .select(
    `
    *,
    modules (
      *,
      module_items (*)
    )
  `
  )
  .eq("id", courseId)
  .single();

// Example: Create a new enrollment
const { data, error } = await supabase.from("enrollments").insert({
  user_id: userId,
  course_id: courseId,
  status: "active",
});

// Example: Create a flashcard deck
const { data: deck, error } = await supabase.from("flashcard_decks").insert({
  course_id: courseId,
  name: "Chapter 1 Vocabulary",
  description: "Key terms from the first chapter",
});

// Example: Fetch quiz with questions and user attempts
const { data: quizData, error } = await supabase
  .from("quizzes")
  .select(
    `
    *,
    quiz_questions (*),
    quiz_attempts!inner (
      score,
      completed_at
    )
  `
  )
  .eq("id", quizId)
  .eq("quiz_attempts.user_id", userId);
```

## Troubleshooting

### **Common Setup Issues**

**🐳 Docker Issues**

```bash
# Problem: "Cannot connect to Docker daemon"
# Solution: Start Docker Desktop first
open -a Docker

# Wait for Docker to start, then try again
supabase start
```

**🔌 Port Conflicts**

```bash
# Problem: "Port already in use"
# Solution: Stop conflicting services
supabase stop
docker ps  # Check for running containers
# Kill any conflicting processes

# Or modify ports in supabase/config.toml
```

**🔗 Project Linking Issues**

```bash
# Problem: "Cannot find project ref"
# Solution: Login and link again
supabase login
supabase projects list
supabase link --project-ref kcduzlbadhzeulhzslvj
```

**📄 Migration Errors**

```bash
# Problem: Migration fails to apply
# Solution: Check SQL syntax and dependencies
supabase db reset  # Reapply all migrations

# If specific migration fails, edit the file:
# supabase/migrations/XXXXX_migration_name.sql
```

**🏷️ TypeScript Type Errors**

```bash
# Problem: Import errors or type mismatches
# Solution: Regenerate types after schema changes
supabase gen types typescript --local > types/supabase.ts

# Or from cloud:
supabase gen types typescript --project-ref kcduzlbadhzeulhzslvj > types/supabase.ts
```

**🌐 Environment Variable Issues**

```bash
# Problem: "Missing SUPABASE_URL environment variable"
# Solution: Copy and configure environment file
cp .env.local.example .env.local
# Edit .env.local with correct values
```

**🔄 Team Sync Issues**

```bash
# Problem: "My database doesn't match teammate's"
# Solution: Reset local database to latest migrations
git pull                    # Get latest migrations
supabase db reset          # Apply all migrations
supabase gen types typescript --local > types/supabase.ts
```

### **Getting Help**

1. **Check Supabase Status**: `supabase status`
2. **View Logs**: Check terminal output for error messages
3. **Reset Everything**: `supabase stop && supabase start`
4. **Team Chat**: Ask teammates if they've seen similar issues
5. **Supabase Docs**: https://supabase.com/docs
