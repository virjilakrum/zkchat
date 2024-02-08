# ZK-chat
 An application for real-time messaging between users using WebSocket, including a basic backend server and logic for encrypting and authenticating messages with zero-knowledge proof using SnarkyJS.

## Architecture

/secure-messaging-zkapp
  /src
    /controllers # Server logic and zk proof operations
    /models # User and message models (if needed)
    /routes # API endpoints
    /utils # Helper functions and snarkyJS related operations
    index.js # The main file that initializes the server
  package.json # Project dependencies and scripts
