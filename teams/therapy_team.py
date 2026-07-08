from agno.team import Team, TeamMode
from agents.cognitive_coach import cbt_agent
from agents.crisis_agent import crisis_agent
from agents.therapist import therapist
from prompts.instructions import get_team_instructions
from core.db import db
from core.llm import default_model



therapy_team = Team(
    name="Therapy Team",
    id="therapy_team",
    db=db,
    model=default_model,
    members=[therapist, cbt_agent, crisis_agent],
    mode=TeamMode.route,
    add_session_state_to_context=True,
    show_members_responses=True,
    update_memory_on_run=True,
    description="A team of specialized agents that provide mental health support and therapy to users. The team consists of a therapist, a cognitive behavioral therapist, and a crisis management therapist. Each agent has unique expertise and approaches to help users navigate their mental health challenges.",
    instructions=get_team_instructions(),
    markdown=True,
)