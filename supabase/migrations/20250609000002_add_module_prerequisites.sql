-- Add module prerequisites support
-- Created: June 9, 2024
-- Description: Allows modules to have prerequisites for proper learning sequence

-- Add prerequisites field to modules table
ALTER TABLE modules ADD COLUMN IF NOT EXISTS prerequisites JSONB DEFAULT '[]';

-- Create index for prerequisites queries
CREATE INDEX IF NOT EXISTS idx_modules_prerequisites ON modules USING GIN (prerequisites);

-- Add comment to explain the prerequisites structure
COMMENT ON COLUMN modules.prerequisites IS 'JSON array of prerequisite module IDs or completion requirements'; 