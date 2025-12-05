# Firestore Database Setup Guide

## Overview
The mental health chatbot now saves all conversation sessions to Google Firestore, a NoSQL cloud database. Each conversation is stored with metadata, timestamps, and structured messages.

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard (you can disable Google Analytics if not needed)

### 2. Enable Firestore Database

1. In your Firebase project, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose a location (select the region closest to your users)
4. Start in **Production mode** or **Test mode**:
   - **Production mode**: Requires security rules (recommended for production)
   - **Test mode**: Open access for 30 days (good for development)

### 3. Generate Service Account Credentials

1. In Firebase Console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Go to the "Service accounts" tab
4. Click "Generate new private key"
5. Download the JSON file (e.g., `firebase-service-account.json`)
6. **Keep this file secure** - it contains sensitive credentials

### 4. Configure Your Application

1. Place the downloaded JSON file in a secure location on your machine
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add the path to your credentials file:
   ```bash
   OPENAI_API_KEY=your-openai-api-key
   FIREBASE_CREDENTIALS_PATH=/path/to/your/firebase-service-account.json
   ```

### 5. Install Firebase Dependencies

Install the required Firebase Admin SDK:
```bash
pip install firebase-admin
```

Or if using the project's dependencies:
```bash
pip install -e .
```

### 6. Firestore Security Rules (Optional)

For production use, set up security rules in Firestore:

1. Go to Firestore Database → Rules
2. Add appropriate security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own sessions
    match /chat_sessions/{sessionId} {
      allow read, write: if request.auth != null;
    }
    
    // For development (less secure):
    // allow read, write: if true;
  }
}
```

## Database Structure

The chatbot creates a `chat_sessions` collection with documents structured as:

```json
{
  "session_id": "20231205_143022",
  "user_id": "anonymous",
  "created_at": "2023-12-05T14:30:22Z",
  "updated_at": "2023-12-05T14:45:18Z",
  "message_count": 10,
  "messages": [
    {
      "speaker": "user",
      "message": "I've been feeling anxious lately",
      "timestamp": "2023-12-05T14:30:25Z",
      "sequence": 0
    },
    {
      "speaker": "bot",
      "message": "I hear you. Anxiety can be overwhelming. Would you like to talk about what's been triggering these feelings?",
      "timestamp": "2023-12-05T14:30:30Z",
      "sequence": 1
    }
  ],
  "metadata": {
    "total_messages": 10,
    "session_duration_estimate": "N/A",
    "ended_at": "2023-12-05T14:45:18Z"
  }
}
```

## Available Database Operations

The `FirestoreDB` class provides:

- `save_session()` - Save complete conversation on exit
- `get_session(session_id)` - Retrieve a specific session
- `get_user_sessions(user_id, limit)` - Get all sessions for a user
- `add_message_to_session()` - Add messages incrementally (real-time)
- `delete_session(session_id)` - Remove a session

## Testing the Integration

1. Start the chatbot:
   ```bash
   python src/mental_health/main.py
   ```

2. Have a conversation and exit (type `quit`, `exit`, or `bye`)

3. Check Firestore Console to verify the conversation was saved:
   - Go to Firebase Console → Firestore Database
   - Look for the `chat_sessions` collection
   - You should see your session document

## Troubleshooting

### "Could not connect to Firestore"
- Verify `FIREBASE_CREDENTIALS_PATH` in `.env` is correct
- Ensure the credentials file exists and is valid JSON
- Check that Firestore is enabled in your Firebase project

### "Permission denied" errors
- Review your Firestore security rules
- For development, temporarily use: `allow read, write: if true;`
- For production, implement proper authentication

### No data appears in Firestore
- Check your internet connection
- Verify the Firebase project is active
- Look for error messages in the console output

## Data Privacy & Security

⚠️ **Important Security Considerations:**

1. **Never commit** the service account JSON file to version control
2. Add `*.json` and `.env` to your `.gitignore`
3. Implement proper authentication for production use
4. Set up appropriate Firestore security rules
5. Consider encrypting sensitive conversation data
6. Comply with HIPAA/GDPR if handling real mental health data
7. Implement data retention policies (auto-delete old sessions)

## Next Steps

- Implement user authentication (Firebase Auth)
- Add real-time message syncing
- Create a web dashboard to view conversations
- Add analytics and insights
- Implement automated backups
