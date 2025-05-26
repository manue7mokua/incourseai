import pytest
from unittest.mock import AsyncMock, patch
from agents.quiz_gen_agent.agent import get_quiz_agent, Deps
from dotenv import load_dotenv
import os
import asyncio
import nest_asyncio
nest_asyncio.apply()

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

def test_student_failing_hist101():
    async def run():
        agent = get_quiz_agent()
        deps = Deps(api_key=API_KEY, course_id="HIST101", file_content_summary="Summary about the early civilizations and ancient empires.")

        with patch("agents.quiz_gen_agent.agent.get_overall_course_performance", new_callable=AsyncMock) as mock_perf, \
            patch("agents.quiz_gen_agent.agent.get_chat_history_summary", new_callable=AsyncMock) as mock_chat, \
            patch("agents.quiz_gen_agent.agent.get_course_quiz_history", new_callable=AsyncMock) as mock_quiz, \
            patch("agents.quiz_gen_agent.agent.get_course_grade_details", new_callable=AsyncMock) as mock_grades:

            mock_perf.return_value = 2
            mock_chat.return_value = "The student has been struggling with the core material in the class."
            mock_quiz.return_value = []
            mock_grades.return_value = []

            result = await agent.run("Generate a quiz for HIST101", deps=deps)
            assert len(result.output) == 5
    asyncio.run(run())


def test_student_struggles_chapter1_hist101():
    async def run():
        agent = get_quiz_agent()
        deps = Deps(api_key=API_KEY, course_id="HIST101", file_content_summary="Summary about Chapter 1 covering prehistoric societies.")

        with patch("agents.quiz_gen_agent.agent.get_overall_course_performance", new_callable=AsyncMock) as mock_perf, \
            patch("agents.quiz_gen_agent.agent.get_chat_history_summary", new_callable=AsyncMock) as mock_chat, \
            patch("agents.quiz_gen_agent.agent.get_course_quiz_history", new_callable=AsyncMock) as mock_quiz, \
            patch("agents.quiz_gen_agent.agent.get_course_grade_details", new_callable=AsyncMock) as mock_grades:

            mock_perf.return_value = 8
            mock_chat.return_value = "Student is having difficulty with Chapter 1 concepts."
            mock_quiz.return_value = [{"quiz_id": "ch1_quiz", "score": 40, "date": "2023-10-01"}]
            mock_grades.return_value = []

            result = await agent.run("Generate a quiz for HIST101", deps=deps)
            assert len(result.output) == 5
    asyncio.run(run())

def test_student_excels_hist101():
    async def run():
        agent = get_quiz_agent()
        deps = Deps(api_key=API_KEY, course_id="HIST101", file_content_summary="Chapter summaries for the medieval period and Renaissance.")

        with patch("agents.quiz_gen_agent.agent.get_overall_course_performance", new_callable=AsyncMock) as mock_perf, \
            patch("agents.quiz_gen_agent.agent.get_chat_history_summary", new_callable=AsyncMock) as mock_chat, \
            patch("agents.quiz_gen_agent.agent.get_course_quiz_history", new_callable=AsyncMock) as mock_quiz, \
            patch("agents.quiz_gen_agent.agent.get_course_grade_details", new_callable=AsyncMock) as mock_grades:

            mock_perf.return_value = 9
            mock_chat.return_value = "The student is curious about deeper historical connections between the Renaissance and Enlightenment."
            mock_quiz.return_value = [{"quiz_id": "medieval_quiz", "score": 95, "date": "2023-10-15"}]
            mock_grades.return_value = [{"assignment_id": "essay_1", "score": 92, "date": "2023-10-10"}]

            result = await agent.run("Generate a quiz for HIST101", deps=deps)
            assert len(result.output) == 5
    asyncio.run(run())