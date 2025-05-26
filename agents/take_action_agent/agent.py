import asyncio
from dataclasses import dataclass
from pydantic import BaseModel, Field
from typing import List, Dict
from pydantic_ai import Agent, RunContext
import random
from shared.prompts.take_action_agent import TAKE_ACTION_PROMPT
from dotenv import load_dotenv

load_dotenv()

MODEL = "google-gla:gemini-2.0-flash"

class RouteOutput(BaseModel):
    """
    Represents the output of the page to route to.
    """
    route_to: str = Field(
        default="",
        description="The route to navigate to."
    )
    file_to_open: str = Field(
        default="",
        description="Optional file to open, e.g., 'syllabus.pdf', 'assignment.docx'."
    )
    quiz_or_flashcard_to_open: str = Field(
        default="",
        description="Optional quiz or flashcard to open, e.g., 'quiz1', 'flashcard_set1'."
    )
    quiz_or_flashcard_to_create: str = Field(
        default="",
        description="Optional quiz or flashcard to create, e.g., 'Create quiz on Chapter 1'."
    )
    course_id: str = Field(
        default="",
        description="Optional course ID for the action, e.g., 'CS101'."
    )
    
    def to_dict(self) -> Dict[str, str]:
        """
        Convert the RouteOutput to a dictionary.
        """
        return {
            "route_to": self.route_to,
            "file_to_open": self.file_to_open,
            "quiz_or_flashcard_to_open": self.quiz_or_flashcard_to_open,
            "quiz_or_flashcard_to_create": self.quiz_or_flashcard_to_create,
            "course_id": self.course_id
        }
        
@dataclass
class Deps:
    api_key: str
 
    
take_action_agent = Agent[
    Deps,
    RouteOutput,
](
    MODEL,
    output_type=RouteOutput,
    system_prompt=TAKE_ACTION_PROMPT
)


@take_action_agent.tool
async def fetch_calendar_events(
    ctx: RunContext[Deps],
    user_id: str
) -> List[Dict[str, str]]:
    """
    Fetch calendar events for the user.
    """
    # Simulate fetching calendar events
    await asyncio.sleep(1)
    return [
        {"event": "Math Exam", "date": "2023-10-01"},
        {"event": "Science Project Due", "date": "2023-10-05"},
        {"event": "History Presentation", "date": "2023-10-10"}
    ]
    
@take_action_agent.tool
async def edit_calendar_event(
    ctx: RunContext[Deps],
    user_id: str,
    event_id: str,
    new_details: Dict[str, str]
) -> bool:
    """
    Edit a calendar event for the user.
    """
    # Simulate editing a calendar event
    await asyncio.sleep(1)
    return random.choice([True, False])