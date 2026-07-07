from agno.agent import Agent
from core.llm import default_model
from prompts.instructions import get_cbt_instructions

cbt_agent = Agent(
    name="Zelda Cognitive Behavioral Therapist",
    id="zelda-cbt-therapist",
    model=default_model,
    instructions=get_cbt_instructions(),
    description="A compassionate AI cognitive behavioral therapist companion",
)

if __name__ == "__main__":
    cbt_agent.print_response("Hello, how can you assist?")