import os
# from agno.models.openai.like import OpenAILike
# from agno.models.deepseek import DeepSeek
# from agno.models.deepinfra import DeepInfra
from agno.models.fireworks import Fireworks
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("MODEL_ACCESS_KEY")

# default_model=OpenAILike(
#     id="gemma-4-31B-it", # openai-gpt-oss-20b
#     api_key=api_key,
#     base_url="https://inference.do-ai.run/v1/",
# )


default_model=Fireworks(
    id="accounts/fireworks/models/qwen3p7-plus"
)

# default_model=DeepInfra(
#     id="google/gemma-4-31B-it"
# )


# default_model=DeepSeek(
#     id="deepseek-chat"
# )