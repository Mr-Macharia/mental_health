import os
from agno.models.openai.like import OpenAILike
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("MODEL_ACCESS_KEY")

default_model=OpenAILike(
    id="gemma-4-31B-it", # openai-gpt-oss-20b
    api_key=api_key,
    base_url="https://inference.do-ai.run/v1/",
)

