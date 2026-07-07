import os
import uvicorn
from agno.os import AgentOS
from dotenv import load_dotenv

from agents.cognitive_coach import cbt_agent
from agents.crisis_agent import crisis_agent
from agents.therapist import therapist

load_dotenv()

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))


agents = [therapist, crisis_agent, cbt_agent]

agent_os = AgentOS(agents=agents)
app = agent_os.get_app()


def main():
    uvicorn.run("main:app", host=HOST, port=PORT)


if __name__ == "__main__":
    main()
