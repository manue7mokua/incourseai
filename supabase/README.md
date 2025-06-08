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

The database includes the following tables:

### Users Table

- `id` (UUID, Primary Key)
- `full_name` (Text, Required)
- `email` (Text, Unique, Required)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Courses Table

- `id` (UUID, Primary Key)
- `name` (Text, Required)
- `instructor` (Text, Required)
- `description` (Text, Optional)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Enrollments Table

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users.id)
- `course_id` (UUID, Foreign Key → courses.id)
- `enrolled_at` (Timestamp)
- `status` (Text: 'active', 'completed', 'dropped')

## Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Users**: Can only view/update their own profile
- **Courses**: Public read access for all users
- **Enrollments**: Users can only view/manage their own enrollments

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
import { supabase, type User, type Course } from "./supabase/client";

// Example: Fetch all courses
const { data: courses, error } = await supabase.from("courses").select("*");

// Example: Create a new enrollment
const { data, error } = await supabase.from("enrollments").insert({
  user_id: userId,
  course_id: courseId,
  status: "active",
});
```

## Troubleshooting

- **Port conflicts**: If ports are in use, stop other services or modify ports in `config.toml`
- **Docker issues**: Ensure Docker is running before starting Supabase
- **Migration errors**: Check SQL syntax in migration files
- **Type errors**: Regenerate types after schema changes
