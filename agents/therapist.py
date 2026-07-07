from agno.agent import Agent
from core.llm import default_model
from prompts.instructions import get_therapist_instructions

therapist = Agent(
    name="Alzira Therapist",
    id="alzira-therapist",
    model=default_model,
    instructions=get_therapist_instructions(),
    description="A compassionate AI therapist companion",
)
