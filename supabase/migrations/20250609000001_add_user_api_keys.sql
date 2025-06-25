-- Add user API keys table for LMS integration
-- Created: June 9, 2024
-- Description: Allows users to store their own LMS API keys for Canvas, Blackboard, etc.

-- Create user_api_keys table
CREATE TABLE IF NOT EXISTS user_api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lms_provider TEXT NOT NULL CHECK (lms_provider IN ('canvas', 'blackboard', 'moodle', 'd2l')),
    encrypted_api_key TEXT NOT NULL,
    api_base_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, lms_provider)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_api_keys_user_id ON user_api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_user_api_keys_lms_provider ON user_api_keys(lms_provider);
CREATE INDEX IF NOT EXISTS idx_user_api_keys_active ON user_api_keys(is_active);

-- Enable RLS
ALTER TABLE user_api_keys ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own API keys" ON user_api_keys
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own API keys" ON user_api_keys
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own API keys" ON user_api_keys
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own API keys" ON user_api_keys
    FOR DELETE USING (user_id = auth.uid());

-- Create trigger for updated_at
CREATE TRIGGER update_user_api_keys_updated_at BEFORE UPDATE ON user_api_keys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 