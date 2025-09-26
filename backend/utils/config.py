from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Canvas API Configuration
    canvas_api_base_url: Optional[str] = None
    canvas_api_key: Optional[str] = None
    
    # Supabase Configuration
    supabase_url: str
    supabase_anon_key: str
    supabase_service_role_key: str
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

# Global settings instance
_settings: Optional[Settings] = None

def get_settings() -> Settings:
    """Get application settings"""
    global _settings
    if _settings is None:
        _settings = Settings()
        print(f"DEBUG: Canvas URL: {_settings.canvas_api_base_url}")
        print(f"DEBUG: Canvas Key: {_settings.canvas_api_key[:20] if _settings.canvas_api_key else None}...")
    return _settings
