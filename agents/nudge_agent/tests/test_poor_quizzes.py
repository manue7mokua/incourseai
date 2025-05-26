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

def test_nudge_agent_recommends_for_poor_quizzes():
    import asyncio

    async def run():
        with patch("agents.nudge_agent.agent.get_course_quiz_history", new_callable=AsyncMock) as mock_quiz_history, \
             patch("agents.nudge_agent.agent.get_overall_course_performance", new_callable=AsyncMock) as mock_perf, \
             patch("agents.nudge_agent.agent.get_assignments", new_callable=AsyncMock) as mock_assignments, \
             patch("agents.nudge_agent.agent.get_chat_history_summary", new_callable=AsyncMock) as mock_chat, \
             patch("agents.nudge_agent.agent.get_course_recent_announcements", new_callable=AsyncMock) as mock_announcements, \
             patch("agents.nudge_agent.agent.get_course_grade_details", new_callable=AsyncMock) as mock_grades:

            course_ids = ["CS101"]

            # Mocked quiz history with poor scores
            mock_quiz_history.return_value = {
                "CS101": [
                    {"quiz_id": "quiz_1", "score": 35, "date": "2023-10-15"},
                    {"quiz_id": "quiz_2", "score": 42, "date": "2023-10-20"},
                ]
            }

            # Mock other tool outputs to minimal necessary
            mock_perf.return_value = {"CS101": 4}
            mock_assignments.return_value = {"CS101": []}
            mock_chat.return_value = "The student has shown confusion about core concepts."
            mock_announcements.return_value = {"CS101": []}
            mock_grades.return_value = {"CS101": []}

            # Run the agent
            deps = Deps(api_key=API_KEY)
            result = await generate_nudges_agent.run("Generate nudges for user.", deps=deps)

            # Assertions: at least one nudge should suggest retaking quiz or studying
            labels = [nudge.label for nudge in result.output]
            assert len(labels) == 5
            expected_labels = [
                "Retake quiz", "Review flashcards", "Review lecture notes",
                "Study material", "Ask for help"
            ]
            assert any(label in expected_labels for label in labels), \
                "Expected at least one label indicating quiz review, studying, or similar."

    asyncio.run(run())