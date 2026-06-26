import os
from agno.agent import Agent
from agno.models.openai.like import OpenAILike
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("DIGITAL_OCEAN_MODEL_ACCESS_KEY")

ai_model=OpenAILike(
    id="openai-gpt-oss-20b", # openai-gpt-oss-20b
    api_key=api_key,
    base_url="https://inference.do-ai.run/v1/",
)

agent = Agent(
    name="Test Agent",
    model=ai_model,
    introduction="If run is successful return response",
)

if __name__ == "__main__":
    agent.print_response("Is everything running?", stream=True)


