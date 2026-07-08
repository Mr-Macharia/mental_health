import os
import uvicorn
from agno.os import AgentOS
from dotenv import load_dotenv

from teams.therapy_team import therapy_team

load_dotenv()

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))



agent_os = AgentOS(teams=[therapy_team])
app = agent_os.get_app()


def main():
    uvicorn.run("main:app", host=HOST, port=PORT)


if __name__ == "__main__":
    main()
