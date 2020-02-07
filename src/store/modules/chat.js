import chatkit from '@/chatkit';

const state = {
  logged: false,
  loading: false,
  sending: false,
  error: null,
  user: [],
  reconnect: false,
  activeRoom: null,
  rooms: [],
  users: [],
  messages: [],
  userTyping: null
}

const mutations = {
  setSession: (state, status) => state.logged = status, 
  setError: (state, error) => state.error = error,
  setLoading: (state, loading) => state.loading = loading,
  setUser: (state, user) => state.user = user,
  setReconnect: (state, reconnect) => state.reconnect = reconnect,
  setActiveRoom: (state, roomId) => state.activeRoom = roomId,
  setRooms: (state, rooms) => state.rooms = rooms,
  setUsers: (state, users) => state.users = users,
  setMessages: (state, messages) => state.messages = messages,
  addMessage: (state, message) => state.messages.push(message),
  setSending: (state, status) => state.sending = status,
  setUserTyping: (state, userId) => state.userTyping = userId,
  clearChatRoom(state) {
    state.users = [];
    state.messages = [];
  },
  reset(state) {
    state.error = null;
    state.users = [];
    state.messages = [];
    state.rooms = [];
    state.user = null
  }
}

const getters = {
  hasError: state => state.error ? true : false
}

const actions = {
  async login({ commit, state }, userId) {
    try {
      commit('setError', '');
      commit('setLoading', true);
      // Connect user to ChatKit service
      const currentUser = await chatkit.connectUser(userId);
      commit('setUser', {
        username: currentUser.id,
        name: currentUser.name
      });

      // Save list of user's rooms in store
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name
      }))
      commit('setRooms', rooms);

      // Subscribe user to a room
      const activeRoom = state.activeRoom || rooms[0]; // pick last used room, or the first one
      commit('setActiveRoom', {
        id: activeRoom.id,
        name: activeRoom.name
      });
      await chatkit.subscribeToRoom(activeRoom.id);
      
      commit('setReconnect', false);

      // Test state.user
      console.log(state.user);
      return true;
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false);
    }
  },
  // addUser() {
  //   chatkit.addUser()
  // },
  async changeRoom({ commit }, roomId) {
    try {
      const { id, name } = await chatkit.subscribeToRoom(roomId);
      commit('setActiveRoom', { id, name });
    } catch (error) {
      handleError(commit, error)
    }
  },
  async sendMessage({ commit }, message) {
    try {
      commit('setError', '');
      commit('setSending', true);
      const messageId = await chatkit.sendMessage(message);
      return messageId;
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setSending', false);
    }
  },
  async logout({ commit }) {
    commit('reset');
    commit('setSession', false);
    chatkit.disconnectUser();
    window.localStorage.removeItem('chat');
  }
}

// Helper function for displaying error messages
export function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit('setError', message);
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
}
