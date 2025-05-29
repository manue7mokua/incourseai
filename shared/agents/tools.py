import asyncio
from pydantic_ai import RunContext
import random
from typing import List, Dict

async def get_overall_course_performance(
    ctx: RunContext
) -> int:
    """
    Get overall course performance rated on a scale of 1-10 for the course whose id is given.
    """
    # Simulate a call to an external API to get overall course performance
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a list of random performance scores
    return random.randint(1, 10)


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
    
    
async def get_course_quiz_history(
    ctx: RunContext
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
    ctx: RunContext
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

async def get_file_content_summaries(
    ctx: RunContext
) -> Dict[str, str]:
    """
    Get file content summary for the list of file IDs.
    """
    # Simulate a call to an external API to get file content summary
    await asyncio.sleep(1)
    
    # For demonstration purposes, return a random file content summary
    file_content_summary = {
        file_id: f"Summary for file {file_id}" for file_id in ctx.deps.file_ids
    }
    return file_content_summary