# Mental Health Chatbot

An AI-powered mental health support companion built with the [Agno](https://github.com/agno-agi/agno) framework. It features **Alzira**, an empathetic, Socratic-style therapist agent designed to provide a safe, reflective space for users to explore their thoughts and emotions.

> **Status:** Early-stage work in progress. Currently a single therapist agent run from the CLI — no chat UI yet.

---

## Current Status

This project is in active early development. What exists today is the core therapy agent plus the scaffolding for the broader system.

**Implemented:**
- ✅ **Alzira therapist agent** — a carefully tuned Agno agent with a detailed system prompt
- ✅ **Therapist persona & instructions** — Socratic questioning, emotional containment, warm neutrality, comfort with pain, and zero toxic positivity
- ✅ **LLM integration** — connected via an OpenAI-compatible inference endpoint using the `gemma-4-31B-it` model
- ✅ **Integration test** — verifies the model connection end-to-end

**Not yet implemented (planned):**
- ⬜ A conversational chat interface (CLI/interactive loop or web UI)
- ⬜ Wiring `main.py` to the agent (currently a placeholder stub)
- ⬜ Architecture and safety documentation (docs exist as empty placeholders)
- ⬜ Safety guardrails and crisis-response handling
- ⬜ Unit and safety test suites
- ⬜ Evaluation test cases and logging

---

## Tech Stack

| Component | Choice |
|-----------|--------|
| Language | Python 3.13 |
| Package manager | [uv](https://docs.astral.sh/uv/) |
| Agent framework | [Agno](https://github.com/agno-agi/agno) |
| Model | `gemma-4-31B-it` (OpenAI-compatible inference endpoint) |
| Config | `python-dotenv` |
| Build | setuptools (`src/` layout) |

---

## Features

- **Empathic, human-natural persona.** Alzira is designed to sound like a seasoned, 20-year-experienced therapist — warm, calm, and grounded, not an "AI cheerleader."
- **Socratic, reflective approach.** Rather than jumping to solutions or advice, the agent helps the user unpack their experience and ends each response with a single open-ended question.
- **Emotional containment.** Responds to intense emotion (panic, anger, sorrow) with low-reactivity, stabilizing language rather than matching high energy.
- **Comfort with pain.** No toxic positivity or motivational pivots — the agent validates the weight of a moment before exploring it.
- **Boundaried and transparent.** Keeps the spotlight on the user and is transparent that it is an AI support companion, not a licensed therapist and does not provide diagnosis.

---

## Project Structure

```
mental_health/
├── data/
│   ├── evaluation/test_cases/   # (planned) evaluation scenarios
│   ├── logs/                    # (planned) run logs
│   └── resources/               # (planned) static resources
├── docs/
│   ├── ARCHITECTURE.md          # (planned) architecture overview
│   └── SAFETY.md                # (planned) safety & crisis policy
├── scripts/                     # (planned) helper scripts
├── src/mental_health_chatbot/
│   ├── agents/
│   │   └── therapist.py         # Alzira therapist agent
│   ├── core/
│   │   └── llm.py               # LLM client / default model config
│   └── prompts/
│       └── instructions.py      # Therapist system prompt / persona
├── tests/
│   ├── integration/
│   │   └── llm_test.py          # Model connection integration test
│   ├── unit/                    # (planned) unit tests
│   └── safety/                  # (planned) safety tests
├── main.py                      # (placeholder — not yet wired to the agent)
├── pyproject.toml
└── README.md
```

---

## Prerequisites

- **Python 3.13** or later
- **[uv](https://docs.astral.sh/uv/)** for dependency management

Install uv (if you don't have it):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

---

## Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd mental_health
   ```

2. **Install dependencies with uv:**

   ```bash
   uv sync
   ```

3. **Configure your environment.** Copy the example env file and add your model access key:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set:

   ```env
   MODEL_ACCESS_KEY=your-model-access-key-here
   ```

   > `.env` is gitignored and will never be committed.

---

## Running the Agent

The therapist agent is the current entrypoint. Run it with:

```bash
uv run python -m mental_health_chatbot.agents.therapist
```

This sends a default message (`"Hello I am sad"`) to Alzira and streams the response to your terminal. To chat on your own input, edit the `print_response(...)` call in `src/mental_health_chatbot/agents/therapist.py`.

---

## Testing

### Integration test — model connection

Verifies that the model endpoint is reachable and returns a response:

```bash
uv run python tests/integration/llm_test.py
```

> Unit and safety test suites are scaffolded but not yet written (see `tests/unit/` and `tests/safety/`).

---

## Configuration

| Variable | Description | Where |
|----------|-------------|-------|
| `MODEL_ACCESS_KEY` | Access key for the inference endpoint | `.env` |
| Model id | `gemma-4-31B-it` | `src/mental_health_chatbot/core/llm.py` |
| Endpoint base URL | OpenAI-compatible inference endpoint | `src/mental_health_chatbot/core/llm.py` |

---

## Important Disclaimer

Alzira is an **AI support companion**, not a licensed therapist, and does **not** provide medical advice or diagnosis. This project is for educational and research purposes. If you or someone you know is in crisis, please contact a qualified professional or your local emergency services.
