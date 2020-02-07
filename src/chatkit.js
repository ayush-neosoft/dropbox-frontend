import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
// import Chatkit from '@pusher/chatkit-server';

import moment from 'moment'
import store from './store'

// const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const INSTANCE_LOCATOR = 'v1:us1:5894f44d-61d5-452d-a2f6-850c0c5f5571';
// const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const TOKEN_URL = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/5894f44d-61d5-452d-a2f6-850c0c5f5571/token';
// const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;
// const SECRET_KEY = '1b44acc6-bcb0-4743-80f5-626d9e7e1d4b:7MyU3n0UzvwfQpakkp/qYQMEZg+tJjeJhVePeno6DIs=';
const MESSAGE_LIMIT = 10;

let currentUser = null;
let activeRoom = null;

async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId
  });
  currentUser = await chatManager.connect();
  return currentUser;
}

// async function addUser() {
//   const chatkit = new Chatkit({
//     instanceLocator: INSTANCE_LOCATOR,
//     key: SECRET_KEY
//   })

//   chatkit.createUser({
//     id: 'ayush',
//     name: 'ayush likhar'
//   })
// }

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state
  }));
  store.commit('chat/setUsers', members);
}

async function subscribeToRoom(roomId) {
  store.commit('chat/clearChatRoom');
  activeRoom = await currentUser.subscribeToRoom({
    roomId,
    messageLimit: MESSAGE_LIMIT,
    hooks: {
      onMessage: message => {
        store.commit('chat/addMessage', {
          name: message.sender.name,
          username: message.senderId,
          text: message.text,
          date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
        });
      },
      onPresenceChanged: () => {
        setMembers();
      },
      onUserStartedTyping: user => {
        store.commit('chat/setUserTyping', user.id)
      },
      onUserStoppedTyping: () => {
        store.commit('chat/setUserTyping', null)
      }
    }
  });
  setMembers();
  return activeRoom;
}

async function sendMessage(text) {
  const messageId = await currentUser.sendMessage({
    text,
    roomId: activeRoom.id
  });
  return messageId;
}

export function isTyping(roomId) {
  currentUser.isTypingIn({ roomId });
}

function disconnectUser() {
  currentUser.disconnect();
}

export default {
  connectUser,
  // addUser,
  subscribeToRoom,
  sendMessage,
  disconnectUser
}