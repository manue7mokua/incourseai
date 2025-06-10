-- Enhanced course schema to match frontend types
-- Created: June 8, 2024
-- Description: Adds modules, flashcards, quizzes, files, and LMS integration features

-- First, add missing columns to the existing courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS lms_id TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS lms_provider TEXT DEFAULT 'canvas';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS code TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS semester TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS year TEXT;

-- Create index for LMS integration
CREATE INDEX IF NOT EXISTS idx_courses_lms_id ON courses(lms_id);
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(code);

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lms_id TEXT,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    items_count INTEGER DEFAULT 0,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create module_items table
CREATE TABLE IF NOT EXISTS module_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lms_id TEXT,
    lms_content_id TEXT,
    name TEXT NOT NULL,
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('file', 'page', 'discussion', 'assignment', 'quiz', 'external_url', 'external_tool')),
    url TEXT,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create flashcard_decks table
CREATE TABLE IF NOT EXISTS flashcard_decks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    items_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create flashcard_items table
CREATE TABLE IF NOT EXISTS flashcard_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deck_id UUID NOT NULL REFERENCES flashcard_decks(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create junction table for flashcard decks and modules (many-to-many)
CREATE TABLE IF NOT EXISTS flashcard_deck_modules (
    deck_id UUID NOT NULL REFERENCES flashcard_decks(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    PRIMARY KEY (deck_id, module_id)
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    items_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create junction table for quizzes and modules (many-to-many)
CREATE TABLE IF NOT EXISTS quiz_modules (
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    PRIMARY KEY (quiz_id, module_id)
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL DEFAULT '[]',
    correct_option INTEGER NOT NULL,
    explanation TEXT,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create quiz_attempts table to track user attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    answers JSONB DEFAULT '{}'
);

-- Create files table
CREATE TABLE IF NOT EXISTS files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    canvas_id TEXT,
    name TEXT NOT NULL,
    size BIGINT NOT NULL DEFAULT 0,
    type TEXT,
    url TEXT,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    module_item_id UUID REFERENCES module_items(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON modules(course_id);
CREATE INDEX IF NOT EXISTS idx_modules_lms_id ON modules(lms_id);
CREATE INDEX IF NOT EXISTS idx_module_items_module_id ON module_items(module_id);
CREATE INDEX IF NOT EXISTS idx_module_items_course_id ON module_items(course_id);
CREATE INDEX IF NOT EXISTS idx_module_items_lms_id ON module_items(lms_id);
CREATE INDEX IF NOT EXISTS idx_flashcard_decks_course_id ON flashcard_decks(course_id);
CREATE INDEX IF NOT EXISTS idx_flashcard_items_deck_id ON flashcard_items(deck_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_course_id ON quizzes(course_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_files_course_id ON files(course_id);
CREATE INDEX IF NOT EXISTS idx_files_canvas_id ON files(canvas_id);

-- Enable RLS on all new tables
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_deck_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Modules policies (public read for enrolled users)
CREATE POLICY "Users can view modules for enrolled courses" ON modules
    FOR SELECT USING (
        course_id IN (
            SELECT course_id FROM enrollments WHERE user_id = auth.uid()
        )
    );

-- Module items policies
CREATE POLICY "Users can view module items for enrolled courses" ON module_items
    FOR SELECT USING (
        course_id IN (
            SELECT course_id FROM enrollments WHERE user_id = auth.uid()
        )
    );

-- Flashcard decks policies
CREATE POLICY "Users can view flashcard decks for enrolled courses" ON flashcard_decks
    FOR SELECT USING (
        course_id IN (
            SELECT course_id FROM enrollments WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create flashcard decks for enrolled courses" ON flashcard_decks
    FOR INSERT WITH CHECK (
        course_id IN (
            SELECT course_id FROM enrollments WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update flashcard decks for enrolled courses" ON flashcard_decks
    FOR UPDATE USING (
        course_id IN (
            SELECT course_id FROM enrollments WHERE user_id = auth.uid()
        )
    );

-- Flashcard items policies
CREATE POLICY "Users can view flashcard items for enrolled courses" ON flashcard_items
    FOR SELECT USING (
        deck_id IN (
            SELECT fd.id FROM flashcard_decks fd
            JOIN enrollments e ON fd.course_id = e.course_id
            WHERE e.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage flashcard items for enrolled courses" ON flashcard_items
    FOR ALL USING (
        deck_id IN (
            SELECT fd.id FROM flashcard_decks fd
            JOIN enrollments e ON fd.course_id = e.course_id
            WHERE e.user_id = auth.uid()
        )
    );

-- Quiz policies
CREATE POLICY "Users can view quizzes for enrolled courses" ON quizzes
    FOR SELECT USING (
        course_id IN (
            SELECT course_id FROM enrollments WHERE user_id = auth.uid()
        )
    );

-- Quiz questions policies
CREATE POLICY "Users can view quiz questions for enrolled courses" ON quiz_questions
    FOR SELECT USING (
        quiz_id IN (
            SELECT q.id FROM quizzes q
            JOIN enrollments e ON q.course_id = e.course_id
            WHERE e.user_id = auth.uid()
        )
    );

-- Quiz attempts policies
CREATE POLICY "Users can view their own quiz attempts" ON quiz_attempts
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own quiz attempts" ON quiz_attempts
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Files policies
CREATE POLICY "Users can view files for enrolled courses" ON files
    FOR SELECT USING (
        course_id IN (
            SELECT course_id FROM enrollments WHERE user_id = auth.uid()
        ) OR course_id IS NULL
    );

-- Junction table policies
CREATE POLICY "Users can view flashcard deck modules for enrolled courses" ON flashcard_deck_modules
    FOR SELECT USING (
        deck_id IN (
            SELECT fd.id FROM flashcard_decks fd
            JOIN enrollments e ON fd.course_id = e.course_id
            WHERE e.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view quiz modules for enrolled courses" ON quiz_modules
    FOR SELECT USING (
        quiz_id IN (
            SELECT q.id FROM quizzes q
            JOIN enrollments e ON q.course_id = e.course_id
            WHERE e.user_id = auth.uid()
        )
    );

-- Add triggers for updated_at columns
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_module_items_updated_at BEFORE UPDATE ON module_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_flashcard_decks_updated_at BEFORE UPDATE ON flashcard_decks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_flashcard_items_updated_at BEFORE UPDATE ON flashcard_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON quizzes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_files_updated_at BEFORE UPDATE ON files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Functions to maintain item counts
CREATE OR REPLACE FUNCTION update_module_items_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE modules SET items_count = items_count + 1 WHERE id = NEW.module_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE modules SET items_count = items_count - 1 WHERE id = OLD.module_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_flashcard_items_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE flashcard_decks SET items_count = items_count + 1 WHERE id = NEW.deck_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE flashcard_decks SET items_count = items_count - 1 WHERE id = OLD.deck_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_quiz_questions_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE quizzes SET items_count = items_count + 1 WHERE id = NEW.quiz_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE quizzes SET items_count = items_count - 1 WHERE id = OLD.quiz_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for item count maintenance
CREATE TRIGGER maintain_module_items_count
    AFTER INSERT OR DELETE ON module_items
    FOR EACH ROW EXECUTE FUNCTION update_module_items_count();

CREATE TRIGGER maintain_flashcard_items_count
    AFTER INSERT OR DELETE ON flashcard_items
    FOR EACH ROW EXECUTE FUNCTION update_flashcard_items_count();

CREATE TRIGGER maintain_quiz_questions_count
    AFTER INSERT OR DELETE ON quiz_questions
    FOR EACH ROW EXECUTE FUNCTION update_quiz_questions_count();
