from agents.therapist import therapist

if __name__ == "__main__":
    message = input("What's on your mind? ")
    therapist.print_response(message, stream=True)
