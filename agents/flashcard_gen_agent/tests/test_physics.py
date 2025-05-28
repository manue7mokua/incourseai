import pytest
import asyncio
from unittest.mock import AsyncMock, patch
from agents.flashcard_gen_agent.agent import get_flashcard_agent, Deps
import os
from dotenv import load_dotenv
import nest_asyncio
nest_asyncio.apply()

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

def test_flashcard_agent_generates_five_flashcards():
    async def run():
        agent = get_flashcard_agent()
        deps = Deps(api_key=API_KEY, course_id="PHYS101", file_ids=["file1", "file2"])
        
        with patch("shared.agents.tools.get_overall_course_performance", new_callable=AsyncMock) as mock_perf, \
            patch("shared.agents.tools.get_chat_history_summary", new_callable=AsyncMock) as mock_chat, \
            patch("shared.agents.tools.get_course_quiz_history", new_callable=AsyncMock) as mock_quiz_history, \
            patch("shared.agents.tools.get_course_grade_details", new_callable=AsyncMock) as mock_grades, \
            patch("shared.agents.tools.get_file_content_summaries", new_callable=AsyncMock) as mock_file_summaries:

            mock_perf.return_value = 6
            mock_chat.return_value = "Student asked questions about energy and kinematics."
            mock_quiz_history.return_value = [
                {"quiz_id": "quiz1", "score": 65, "date": "2023-10-05"},
                {"quiz_id": "quiz2", "score": 75, "date": "2023-10-10"},
            ]
            mock_grades.return_value = [
                {"assignment_id": "a1", "score": 60, "date": "2023-10-02"},
                {"assignment_id": "a2", "score": 85, "date": "2023-10-08"},
            ]
            mock_file_summaries.return_value = {
                "file1": "Chapter 1: This file covers energy and power.",
                "file2": "Chapter 2: This file covers kinematics and motion equations."
            }

            result = await agent.run("Generate flashcards for PHYS101 chapters 1 and 2.", deps=deps)

            assert len(result.output) == 5
            for flashcard in result.output:
                assert isinstance(flashcard.question, str)
                assert isinstance(flashcard.answer, str)
                
    asyncio.run(run())