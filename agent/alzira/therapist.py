from agno.agent import Agent
from core.llm import default_model
from prompts.instructions import get_therapist_instructions

agent = Agent(
    name="General Therapist Agent",
    id="general-therapist-agent",
    role="General Therapist",
    model=default_model,
    instructions=get_therapist_instructions(),
    introduction="If run is successful return response",
    description="This agent is designed to provide therapeutic support and guidance to users seeking mental health assistance.",
)

if __name__ == "__main__":
    agent.print_response("Hello I am sad", stream=True)
