# Supabase Database Setup

This directory contains the Supabase configuration and database schema for the incourse application.

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

## Common Commands

```bash
# Stop local Supabase
supabase stop

# Reset local database (applies all migrations)
supabase db reset

# Create a new migration
supabase migration new <migration_name>

# Generate types for production
supabase gen types typescript --project-id <your-project-id> > types/supabase.ts

# View local database status
supabase status
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

- **Port conflicts**: If ports are in use, stop other services or modify ports in `config.toml`
- **Docker issues**: Ensure Docker is running before starting Supabase
- **Migration errors**: Check SQL syntax in migration files
- **Type errors**: Regenerate types after schema changes
