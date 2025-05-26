import pytest
from agents.take_action_agent.agent import take_action_agent, RouteOutput, Deps
from dotenv import load_dotenv
import os
import asyncio
import nest_asyncio
nest_asyncio.apply()

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

def test_create_new_quiz_routing():
    async def run():
        deps = Deps(api_key=API_KEY)
        nudge = "label: Create quiz, action: Create and take a new quiz to review linked lists for CSCI 201"

        result = await take_action_agent.run(nudge, deps=deps)
        output: RouteOutput = result.output
        print(output.to_dict())

        assert output.route_to == "quiz"
        assert "linked lists" in output.quiz_or_flashcard_to_create.lower()
        assert output.quiz_or_flashcard_to_open == ""
        assert output.file_to_open == ""
        assert output.course_id == "CSCI 201"
    asyncio.run(run())

def test_retake_existing_quiz_routing():
    async def run():
        deps = Deps(api_key=API_KEY)
        nudge = "label: Retake quiz, action: Try quiz 3 of CSCI 101 again to improve your score"

        result = await take_action_agent.run(nudge, deps=deps)
        output: RouteOutput = result.output
        print(output.to_dict())

        assert output.route_to == "quiz"
        assert "quiz" in output.quiz_or_flashcard_to_open.lower()
        assert output.quiz_or_flashcard_to_create == ""
        assert output.file_to_open == ""
        assert output.course_id == "CSCI 101"
    
    asyncio.run(run())