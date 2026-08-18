from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PORT: int = 8000
    GROQ_API_KEY: str
    GROQ_MODEL: str = "llama3-70b-8192"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()