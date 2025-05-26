import pytest
from unittest.mock import AsyncMock, patch
from agents.nudge_agent.agent import generate_nudges_agent, Deps
import os
from dotenv import load_dotenv
import nest_asyncio
nest_asyncio.apply()

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set.")
else:
    print("GEMINI_API_KEY is set.")

def test_nudge_agent_for_high_scores_with_assignment_and_confusion():
    import asyncio

    async def run():
        with patch("agents.nudge_agent.agent.get_course_quiz_history", new_callable=AsyncMock) as mock_quiz_history, \
             patch("agents.nudge_agent.agent.get_overall_course_performance", new_callable=AsyncMock) as mock_perf, \
             patch("agents.nudge_agent.agent.get_assignments", new_callable=AsyncMock) as mock_assignments, \
             patch("agents.nudge_agent.agent.get_chat_history_summary", new_callable=AsyncMock) as mock_chat, \
             patch("agents.nudge_agent.agent.get_course_recent_announcements", new_callable=AsyncMock) as mock_announcements, \
             patch("agents.nudge_agent.agent.get_course_grade_details", new_callable=AsyncMock) as mock_grades:

            course_ids = ["CS101"]

            mock_quiz_history.return_value = {
                "CS101": [
                    {"quiz_id": "quiz_1", "score": 90, "date": "2023-10-15"},
                    {"quiz_id": "quiz_2", "score": 95, "date": "2023-10-20"},
                ]
            }

            mock_perf.return_value = {"CS101": 9}
            mock_assignments.return_value = {
                "CS101": [
                    {
                        "assignment_id": "assignment_1",
                        "title": "Final Project",
                        "due_date": "2023-10-23"
                    }
                ]
            }
            mock_chat.return_value = "User has expressed confusion with lecture materials on recursion and trees."
            mock_announcements.return_value = {"CS101": []}
            mock_grades.return_value = {"CS101": []}

            deps = Deps(api_key=API_KEY)
            result = await generate_nudges_agent.run("Generate nudges for user.", deps=deps)

            labels = [nudge.label for nudge in result.output]
            assert len(labels) == 5
            assert any(label in ("Block out study time", "Work on assignments", "Study material", "Ask for help") for label in labels), "Expected a label related to the upcoming assignment."

    asyncio.run(run())