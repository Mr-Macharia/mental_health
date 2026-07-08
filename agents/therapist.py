from agno.agent import Agent
from core.llm import default_model
from core.db import db
from prompts.instructions import get_therapist_instructions

therapist = Agent(
    name="Alzira Therapist",
    id="alzira-therapist",
    model=default_model,
    db=db,
    update_memory_on_run=True,
    instructions=get_therapist_instructions(),
    description="A compassionate AI therapist companion",
)

if __name__ == "__main__":
    therapist.print_response("Hello, how can you assist?")