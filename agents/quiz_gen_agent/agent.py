import asyncio
from dataclasses import dataclass
from pydantic import BaseModel, Field
from typing import List, Dict
from pydantic_ai import Agent, RunContext, Tool
import random
from shared.prompts.quiz_agent_prompt import QUIZ_AGENT_PROMPT
from dotenv import load_dotenv

load_dotenv()

MODEL = "google-gla:gemini-2.0-flash"

class Quiz(BaseModel):
    """
    A class representing a quiz.
    """
    question: str = Field(
        ...,
        description="The question to be asked in the quiz."
    )
    options: List[str] = Field(
        ...,
        description="The options for the quiz question. Must be four options."
    )
    response_index: int = Field(
        ...,
        description="The index of the correct response in the options list."
    )
    explanation: str = Field(
        ...,
        description="An explanation of the correct answer."
    )
    helper_image_prompt: str = Field(
        default="",
        description="Optional. A prompt for generating a helper image related to the quiz question."
    )
    
    def to_dict(self) -> Dict[str, str]:
        """
        Convert the Quiz object to a dictionary.
        """
        return {
            "question": self.question,
            "options": ", ".join(self.options),
            "response_index": str(self.response_index),
            "explanation": self.explanation,
            "helper_image_prompt": self.helper_image_prompt
        }

        
@dataclass
class Deps:
    api_key: str
    course_id: str
    file_content_summary: str
    
    
def get_quiz_agent(**kwargs) -> Agent[Deps, List[Quiz]]:
    """
    Get an agent for generating quizzes based on the provided prompt.
    """
    system_prompt = kwargs.get("prompt", None)
    if system_prompt is None:
        system_prompt = QUIZ_AGENT_PROMPT
    
    return Agent[
        Deps,
        List[Quiz],
    ](
        MODEL,
        output_type=List[Quiz],
        system_prompt=system_prompt,
        tools=[  
            Tool(get_overall_course_performance, takes_ctx=True),
            Tool(get_chat_history_summary, takes_ctx=True),
            Tool(get_course_quiz_history, takes_ctx=True),
            Tool(get_course_grade_details, takes_ctx=True),
        ],
    )


async def get_overall_course_performance(
    ctx: RunContext[Deps]
) -> int:
    """
    Get overall course performance rated on a scale of 1-10 for the course whose id is given.
    """
    # Simulate a call to an external API to get overall course performance
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a list of random performance scores
    return random.randint(1, 10)


async def get_chat_history_summary(
    ctx: RunContext[Deps]
) -> str:
    """
    Get chat history for the list of course IDs.
    """
    # Simulate a call to an external API to get chat history
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a random chat history summary
    return "User has been asking about the course content and assignments. User seems to be struggling with the material. Would you like some help?"
    
    
async def get_course_quiz_history(
    ctx: RunContext[Deps]
) -> List[Dict[str, str]]:
    """
    Get quiz history for the list of course IDs.
    """
    # Simulate a call to an external API to get quiz history
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a list of random quiz history
    quiz_history = [
        {
            "quiz_id": f"quiz_{i}",
            "score": random.randint(0, 100),
            "date": f"2023-10-{random.randint(1, 30)}"
        }
        for i in range(1, 4)
    ]
    return quiz_history

async def get_course_grade_details(
    ctx: RunContext[Deps]
) -> List[Dict[str, str]]:
    """
    Get course grade details for the list of course IDs.
    """
    # Simulate a call to an external API to get course grade details
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a list of random course grade details
    course_grades = [
        {
            "assignment_id": f"assignment_{i}",
            "score": random.randint(0, 100),
            "date": f"2023-10-{random.randint(1, 30)}"
        }
        for i in range(1, 4)
    ]
    return course_grades