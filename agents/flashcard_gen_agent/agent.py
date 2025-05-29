import asyncio
from dataclasses import dataclass
from pydantic import BaseModel, Field
from typing import List, Dict
from pydantic_ai import Agent, Tool
from shared.prompts.flashcard_agent_prompt import FLASHCARD_AGENT_PROMPT
from dotenv import load_dotenv
from shared.agents.tools import get_chat_history_summary, get_course_grade_details, get_course_quiz_history, get_file_content_summaries, get_overall_course_performance


load_dotenv()

MODEL = "google-gla:gemini-2.0-flash"

class Flashcard(BaseModel):
    """
    A class representing a flashcard.
    """
    question: str = Field(
        ...,
        description="The question to be asked on the flashcard."
    )
    answer: str = Field(
        ...,
        description="The answer to the flashcard question."
    )
    image_prompt: str = Field(
        default="",
        description="Optional. A prompt for generating an image related to the flashcard question."
    )
    
    def to_dict(self) -> Dict[str, str]:
        """
        Convert the Flashcard object to a dictionary.
        """
        return {
            "question": self.question,
            "answer": self.answer,
            "image_prompt": self.image_prompt
        }

        
@dataclass
class Deps:
    api_key: str
    course_id: str
    file_ids: List[str]
    
    
def get_flashcard_agent(**kwargs) -> Agent[Deps, List[Flashcard]]:
    """
    Get an agent for generating flashcards based on course content.
    """
    system_prompt = kwargs.get("prompt", None)
    if system_prompt is None:
        system_prompt = FLASHCARD_AGENT_PROMPT
    
    return Agent[
        Deps,
        List[Flashcard],
    ](
        MODEL,
        output_type=List[Flashcard],
        system_prompt=system_prompt,
        tools=[  
            Tool(get_overall_course_performance, takes_ctx=True),
            Tool(get_chat_history_summary, takes_ctx=True),
            Tool(get_course_quiz_history, takes_ctx=True),
            Tool(get_course_grade_details, takes_ctx=True),
            Tool(get_file_content_summaries, takes_ctx=True),
        ],
    )