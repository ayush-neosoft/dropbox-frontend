<template>
  <div>
    <div class="chat-dashboard" v-if="logged">
      <ChatNavBar />
      <b-container fluid class="ld-over" v-bind:class="{ running: loading }">
        <div class="ld ld-ring ld-spin"></div>
        <b-row>
          <b-col cols="2">
            <RoomList />
          </b-col>

          <b-col cols="8">
            <b-row>
              <b-col id="chat-content">
                <MessageList />
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <MessageForm />
              </b-col>
            </b-row>
          </b-col>

          <b-col cols="2">
            <UserList />
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div v-else>
      <ChatLogin />
    </div>
  </div>
</template>

<script>
import ChatLogin from '@/views/ChatLogin.vue'
import ChatNavBar from '@/components/chat/ChatNavBar.vue'
import RoomList from '@/components/chat/RoomList.vue'
import MessageList from '@/components/chat/MessageList.vue'
import MessageForm from '@/components/chat/MessageForm.vue'
import UserList from '@/components/chat/UserList.vue'
import { mapState } from 'vuex';

export default {
  name: 'Chat',
  components: {
    ChatLogin,
    ChatNavBar,
    RoomList,
    UserList,
    MessageList,
    MessageForm
  },
  computed: {
    ...mapState('chat', ['loading', 'logged'])
  }
}
</script>
