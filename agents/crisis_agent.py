from agno.agent import Agent
from core.llm import default_model
from core.db import db
from prompts.instructions import get_cmt_instructions

crisis_agent = Agent(
    name="Axel Crisis Management Therapist",
    id="axel-crisis-therapist",
    db=db,
    update_memory_on_run=True,
    model=default_model,
    instructions=get_cmt_instructions(),
    description="A compassionate AI crisis management therapist companion",
)

if __name__ == "__main__":
    crisis_agent.print_response("Hello, how can you assist?")