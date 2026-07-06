# import os
from agno.agent import Agent
# from agno.models.openai.like import OpenAILike
from core.llm import default_model
from dotenv import load_dotenv

load_dotenv()


agent = Agent(
    name="Test Agent",
    model=default_model,
    introduction="If run is successful return response",
)

if __name__ == "__main__":
    agent.print_response("Is everything running?", stream=True)


