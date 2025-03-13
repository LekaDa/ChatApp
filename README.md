# Welcome to The Chat app 👋

## Get started

1. The current version of Node I'm using is v22.13.1, so make sure you have that. 
   If you dont have that version, try getting NVM(Node version Manager) 
   because it helps a lot with that. ---> (https://github.com/nvm-sh/nvm)

      * Once downloading and installing nvm, you need to run two commands:
       1- nvm install 22.13.1
       2- nvm use 22.13.1

      from now on you will be using my version of node, Good luck!   


2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```

4. Start the Convex (the real-time database that we are using)

   ```bash
    npx convex dev
   ```
After that you can enjoy playing with the app in web or your phone using Expo Go, Cheers!


##  App Functionality

### 1 Chat Room List

* **Purpose:** The Chat Room List screen displays a list of available chat rooms and provides an interface for creating new rooms.
* **User Interface:**
    * The screen displays a list of chat room names.
    * A "Create New Room" button is located at the bottom of the screen.
    * A "Qr code" image button is available.
    * Users can tap on the QR code to view a scan other qr codes to join chatrooms.

* **Interaction:**
    * Users can tap on a chat room name to join the room.
    * Users can tap the "Create New Room" button to navigate to the Chat Room Creation screen.

### 2 Chat Room Creation

* **Purpose:** The Chat Room Creation screen allows users to create new chat rooms.
* **User Interface:**
    * The screen contains a text input field for entering the chat room name (optional).
* **Interaction:**
    * Users must tap the "Create Room" button to create a new chat room.
    * Upon successful creation, users are navigated to the newly created chat room.

### 3 Chat Room

* **Purpose:** The Chat Room screen displays the messages within a chat room and allows users to send new messages.
* **User Interface:**
    * The screen displays a list of messages, with each message showing the sender's username and the message body also the time when the message was created.
    * A text input field is located at the bottom of the screen for typing new messages.
    * A "Send" button is located next to the text input.
    * A QR code representing the current chat room ID is displayed.
    * A "Qr code" image button is available.
* **Interaction:**
    * Users can view the messages in the chat room.
    * Users can type a message in the text input and tap the "Send" button to send a new message.
    * Users can tap on the QR code to view a larger version.