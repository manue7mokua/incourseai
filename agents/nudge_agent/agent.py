import asyncio
from dataclasses import dataclass
from pydantic import BaseModel, Field
from typing import List, Dict
from pydantic_ai import Agent, RunContext
import random
from shared.prompts.nudge_agent_prompt import NUDGE_AGENT_PROMPT
from dotenv import load_dotenv

load_dotenv()

MODEL = "google-gla:gemini-2.0-flash"

class Nudge(BaseModel):
    """
    A class representing a nudge.
    """
    nudge: str = Field(
        ...,
        description="The nudge to be sent to the user."
    )
    action: str = Field(
        ...,
        description="The action to be taken when the user takes action on the nudge."
    )
    label: str = Field(
        description="The label for the nudge, used for categorization and testing purposes.",
    )
    
    def to_dict(self) -> Dict[str, str]:
        """
        Convert the Nudge object to a dictionary.
        """
        return {
            "nudge": self.nudge,
            "action": self.action,
            "label": self.label
        }
        
@dataclass
class Deps:
    api_key: str
    
    
generate_nudges_agent = Agent[
    Deps,
    List[Nudge],
](
    MODEL,
    output_type=List[Nudge],
    system_prompt=NUDGE_AGENT_PROMPT
)


@generate_nudges_agent.tool
async def get_overall_course_performance(
    ctx: RunContext,
    course_ids: List[str],
) -> Dict[str, int]:
    """
    Get overall course performance rated on a scale of 1-10 for the list of course IDs.
    """
    # Simulate a call to an external API to get overall course performance
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a list of random performance scores
    return {course_id: random.randint(1, 10) for course_id in course_ids}


@generate_nudges_agent.tool
async def get_assignments(
    ctx: RunContext,
    course_ids: List[str],
) -> Dict[str, List[Dict[str, str]]]:
    """
    Get assignments for the list of course IDs.
    """
    # Simulate a call to an external API to get assignments
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a list of random assignments
    assignments = {
        course_id: [
            {
                "assignment_id": f"assignment_{i}",
                "title": f"Assignment {i}",
                "due_date": f"2023-10-{random.randint(1, 30)}"
            }
            for i in range(1, 4)
        ]
        for course_id in course_ids
    }
    return assignments


@generate_nudges_agent.tool
async def get_chat_history_summary(
    ctx: RunContext
) -> str:
    """
    Get chat history for the list of course IDs.
    """
    # Simulate a call to an external API to get chat history
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a random chat history summary
    return "User has been asking about the course content and assignments. User seems to be struggling with the material. Would you like some help?"

@generate_nudges_agent.tool
async def get_course_recent_announcements(
    ctx: RunContext,
    course_ids: List[str],
) -> Dict[str, List[Dict[str, str]]]:
    """
    Get recent announcements for the list of course IDs.
    """
    # Simulate a call to an external API to get recent announcements
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a list of random announcements
    announcements = {
        course_id: [
            {
                "announcement_id": f"announcement_{i}",
                "title": f"Announcement {i}",
                "date": f"2023-10-{random.randint(1, 30)}"
            }
            for i in range(1, 4)
        ]
        for course_id in course_ids
    }
    return announcements
    
    
@generate_nudges_agent.tool
async def get_course_quiz_history(
    ctx: RunContext,
    course_ids: List[str],
) -> Dict[str, List[Dict[str, str]]]:
    """
    Get quiz history for the list of course IDs.
    """
    # Simulate a call to an external API to get quiz history
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a list of random quiz history
    quiz_history = {
        course_id: [
            {
                "quiz_id": f"quiz_{i}",
                "score": random.randint(0, 100),
                "date": f"2023-10-{random.randint(1, 30)}"
            }
            for i in range(1, 4)
        ]
        for course_id in course_ids
    }
    return quiz_history

@generate_nudges_agent.tool
async def get_course_grade_details(
    ctx: RunContext,
    course_ids: List[str],
) -> Dict[str, List[Dict[str, str]]]:
    """
    Get course grade details for the list of course IDs.
    """
    # Simulate a call to an external API to get course grade details
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a list of random course grade details
    course_grades = {
        course_id: [
            {
                "assignment_id": f"assignment_{i}",
                "score": random.randint(0, 100),
                "date": f"2023-10-{random.randint(1, 30)}"
            }
            for i in range(1, 4)
        ]
        for course_id in course_ids
    }
    return course_grades