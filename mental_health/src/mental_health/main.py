#!/usr/bin/env python
import sys
import warnings
from datetime import datetime
from mental_health.crew import MentalHealth

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# This main file is intended to be a way for you to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information


def truncate_to_30_words(text):
    """Truncate response to exactly 30 words or fewer."""
    words = text.split()
    if len(words) > 30:
        return ' '.join(words[:30]) + '...'
    return text


def chat():
    """
    Run the interactive mental health chatbot.
    """
    print("Mental Health Chatbot - I'm here to listen and support you.")
    print("Type 'quit', 'exit', or 'bye' to end the conversation.\n")
    
    crew_instance = MentalHealth().crew()
    conversation_history = []
    session_id = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    try:
        while True:
            user_input = input("You: ").strip()
            
            if not user_input:
                continue
                
            # Check for exit commands
            if user_input.lower() in ['quit', 'exit', 'bye', 'end']:
                print("\nBot: Thank you for sharing with me today. Take care of yourself. Remember, you're not alone.")
                break
            
            # Build conversation context - include all previous messages
            context = "\n".join(conversation_history) if conversation_history else "This is the start of the conversation."
            
            inputs = {
                'user_message': user_input,
                'conversation_history': context
            }
            
            # Get response from crew
            result = crew_instance.kickoff(inputs=inputs)
            response = str(result.raw) if hasattr(result, 'raw') else str(result)
            
            # Truncate to 30 words
            response = truncate_to_30_words(response)
            
            # Store in conversation history
            conversation_history.append(f"User: {user_input}")
            conversation_history.append(f"Bot: {response}")
            
            print(f"Bot: {response}\n")
            
    except KeyboardInterrupt:
        print("\n\nBot: Take care. Remember to be kind to yourself.")
    except Exception as e:
        print(f"\nAn error occurred: {e}")
    finally:
        # Placeholder for Firestore integration
        # TODO: Save conversation_history to Firestore with session_id
        print(f"\n[Session {session_id} ended - {len(conversation_history)//2} messages exchanged]")


def run():
    """
    Run the crew (legacy function - now redirects to chat).
    """
    chat()


def train():
    """
    Train the crew for a given number of iterations.
    """
    inputs = {
        "topic": "AI LLMs",
        'current_year': str(datetime.now().year)
    }
    try:
        MentalHealth().crew().train(n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")

def replay():
    """
    Replay the crew execution from a specific task.
    """
    try:
        MentalHealth().crew().replay(task_id=sys.argv[1])

    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")

def test():
    """
    Test the crew execution and returns the results.
    """
    inputs = {
        "topic": "AI LLMs",
        "current_year": str(datetime.now().year)
    }

    try:
        MentalHealth().crew().test(n_iterations=int(sys.argv[1]), eval_llm=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while testing the crew: {e}")

def run_with_trigger():
    """
    Run the crew with trigger payload.
    """
    import json

    if len(sys.argv) < 2:
        raise Exception("No trigger payload provided. Please provide JSON payload as argument.")

    try:
        trigger_payload = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        raise Exception("Invalid JSON payload provided as argument")

    inputs = {
        "crewai_trigger_payload": trigger_payload,
        "topic": "",
        "current_year": ""
    }

    try:
        result = MentalHealth().crew().kickoff(inputs=inputs)
        return result
    except Exception as e:
        raise Exception(f"An error occurred while running the crew with trigger: {e}")


if __name__ == "__main__":
    chat()
