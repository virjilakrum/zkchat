# Eliptic-Chat Fully Trustless(Zero-Knowledge)
 An application for real-time messaging between users using WebSocket, including a basic backend server and logic for encrypting and authenticating messages with zero-knowledge proof using **o1js**.
 
![diagram(31)](https://github.com/virjilakrum/zkchat/assets/158029357/18eb3470-d817-4f00-87ab-8e798916699c)

# ZK Messaging o1js with Zkapp (Mina Berkeley Network)

## Description

This Zkapp provides Zero-Knowledge (ZK) proof-based secure messaging on the Mina Berkeley Network using the **o1js** library. Users can send messages with verifiable authenticity and integrity without exposing sensitive content.

## File Structure

<img width="191" alt="Ekran Resmi 2024-02-14 16 43 49" src="https://github.com/virjilakrum/zkchat/assets/158029357/85f88ed0-63ed-4669-a4b9-4f63f60f4391">

**app.ts:**

    * The main entry point for Zkapp.
    * Imports basic ZK libraries.
    * Deploys zkProof and zkVerifier contracts.
    * Initializes the `Chat` component for the messaging interface.

**components/Chat.tsx:**

    * Primary messaging interface.
    * Processes user input for sending messages.
    * Handles ZK proof generation and verification logic.

**components/Message.tsx:**

    * Creates individual messages in chat history.

**components/User.tsx:**

    * Shows user information (username, public key, etc.).

**contracts/zkProof.ts:**

    o1js module containing the logic to generate ZK proofs for message authenticity.

**contracts/zkVerifier.ts:**

    o1js module defining the logic for validating ZK proofs.

**node_modules:**

    * Contains o1js and other project dependencies.

**package.json:**

    * lists project dependencies and configurations for Zkapp and Mina Berkeley Network.

**tests/Chat.test.ts:**

    * Unit tests to ensure Zkapp functionality and robustness.

## Additional Features

* **User authentication:** Securely identify users before exchanging messages.
* **Message history:** Store and retrieve past messages for reference.
* **Group chats:** Support messaging between groups of users.

## Example Usage

1. Alice and Bob install ZK Messaging Zkapp and Mina connects to Berkeley Network.
2. Alice creates a message in the `Chat` interface and presses "Send".
3. The Zkapp generates a ZK proof attesting to the message's authenticity and origin.
4. The message and proof are transmitted to Bob.
5. Bob's Zkapp verifies the ZK proof. If valid, the message is displayed.

## Compatibility with Mina Berkeley Network

    * Obtain a Mina Berkeley Network account.
    * Deploy the Zkapp to the network.
    * Start the Zkapp and connect it to your Mina Berkeley Network account.
 
## Development

This Zkapp offers a basic foundation for ZK-powered messaging. Feel free to contribute by:

    * Extending features (e.g., file sharing, rich media support).
    * Enhancing security and privacy aspects.
    * Optimizing ZK proof generation and verification for efficiency.

## Questions?

* Please reach out if you have any questions or would like to discuss this project further.
