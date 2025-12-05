"""
Firestore database module for storing mental health chatbot conversations.
"""
import os
from datetime import datetime
from typing import List, Dict, Optional
import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.base_query import FieldFilter


class FirestoreDB:
    """Handle Firestore database operations for chat conversations."""
    
    def __init__(self):
        """Initialize Firestore connection."""
        self.db = None
        self._initialize_firestore()
    
    def _initialize_firestore(self):
        """Initialize Firebase Admin SDK and Firestore client."""
        try:
            # Check if Firebase app is already initialized
            if not firebase_admin._apps:
                # Get credentials path from environment variable
                cred_path = os.getenv('FIREBASE_CREDENTIALS_PATH')
                
                if cred_path and os.path.exists(cred_path):
                    # Initialize with service account credentials
                    cred = credentials.Certificate(cred_path)
                    firebase_admin.initialize_app(cred)
                else:
                    # Initialize with default credentials (for Google Cloud environment)
                    firebase_admin.initialize_app()
            
            self.db = firestore.client()
            print("✓ Firestore connection established")
            
        except Exception as e:
            print(f"⚠ Warning: Could not connect to Firestore: {e}")
            print("Conversations will not be saved to database.")
            self.db = None
    
    def save_session(self, session_id: str, conversation_history: List[str], 
                     user_id: Optional[str] = None, metadata: Optional[Dict] = None) -> bool:
        """
        Save a complete conversation session to Firestore.
        
        Args:
            session_id: Unique identifier for the session
            conversation_history: List of conversation messages (alternating User/Bot)
            user_id: Optional user identifier
            metadata: Optional additional metadata (e.g., user preferences, session duration)
        
        Returns:
            bool: True if saved successfully, False otherwise
        """
        if not self.db:
            return False
        
        try:
            # Parse conversation history into structured messages
            messages = []
            for i, msg in enumerate(conversation_history):
                if msg.startswith("User: "):
                    messages.append({
                        'speaker': 'user',
                        'message': msg[6:],  # Remove "User: " prefix
                        'timestamp': datetime.now(),
                        'sequence': i
                    })
                elif msg.startswith("Bot: "):
                    messages.append({
                        'speaker': 'bot',
                        'message': msg[5:],  # Remove "Bot: " prefix
                        'timestamp': datetime.now(),
                        'sequence': i
                    })
            
            # Prepare session document
            session_data = {
                'session_id': session_id,
                'user_id': user_id or 'anonymous',
                'created_at': datetime.now(),
                'updated_at': datetime.now(),
                'message_count': len(messages),
                'messages': messages,
                'metadata': metadata or {}
            }
            
            # Save to Firestore collection 'chat_sessions'
            doc_ref = self.db.collection('chat_sessions').document(session_id)
            doc_ref.set(session_data)
            
            print(f"✓ Session {session_id} saved to Firestore ({len(messages)} messages)")
            return True
            
        except Exception as e:
            print(f"✗ Error saving session to Firestore: {e}")
            return False
    
    def get_session(self, session_id: str) -> Optional[Dict]:
        """
        Retrieve a conversation session from Firestore.
        
        Args:
            session_id: Unique identifier for the session
        
        Returns:
            Dict containing session data, or None if not found
        """
        if not self.db:
            return None
        
        try:
            doc_ref = self.db.collection('chat_sessions').document(session_id)
            doc = doc_ref.get()
            
            if doc.exists:
                return doc.to_dict()
            return None
            
        except Exception as e:
            print(f"✗ Error retrieving session: {e}")
            return None
    
    def get_user_sessions(self, user_id: str, limit: int = 10) -> List[Dict]:
        """
        Retrieve all sessions for a specific user.
        
        Args:
            user_id: User identifier
            limit: Maximum number of sessions to retrieve
        
        Returns:
            List of session dictionaries
        """
        if not self.db:
            return []
        
        try:
            sessions_ref = self.db.collection('chat_sessions')
            query = sessions_ref.where(filter=FieldFilter('user_id', '==', user_id)) \
                               .order_by('created_at', direction=firestore.Query.DESCENDING) \
                               .limit(limit)
            
            sessions = []
            for doc in query.stream():
                session_data = doc.to_dict()
                sessions.append(session_data)
            
            return sessions
            
        except Exception as e:
            print(f"✗ Error retrieving user sessions: {e}")
            return []
    
    def add_message_to_session(self, session_id: str, speaker: str, message: str) -> bool:
        """
        Add a single message to an existing session.
        
        Args:
            session_id: Unique identifier for the session
            speaker: 'user' or 'bot'
            message: The message content
        
        Returns:
            bool: True if added successfully, False otherwise
        """
        if not self.db:
            return False
        
        try:
            doc_ref = self.db.collection('chat_sessions').document(session_id)
            
            # Create message object
            new_message = {
                'speaker': speaker,
                'message': message,
                'timestamp': datetime.now(),
                'sequence': firestore.Increment(1)
            }
            
            # Update session with new message
            doc_ref.update({
                'messages': firestore.ArrayUnion([new_message]),
                'updated_at': datetime.now(),
                'message_count': firestore.Increment(1)
            })
            
            return True
            
        except Exception as e:
            print(f"✗ Error adding message to session: {e}")
            return False
    
    def delete_session(self, session_id: str) -> bool:
        """
        Delete a conversation session from Firestore.
        
        Args:
            session_id: Unique identifier for the session
        
        Returns:
            bool: True if deleted successfully, False otherwise
        """
        if not self.db:
            return False
        
        try:
            self.db.collection('chat_sessions').document(session_id).delete()
            print(f"✓ Session {session_id} deleted")
            return True
            
        except Exception as e:
            print(f"✗ Error deleting session: {e}")
            return False
