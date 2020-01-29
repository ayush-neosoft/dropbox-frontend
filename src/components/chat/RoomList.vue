<template>
  <div class="room-list">
    <div class="text-xs text-primary font-weight-bold text-uppercase mb-1"> Channels </div>
    <b-list-group v-if="activeRoom">
      <b-list-group-item v-for="room in rooms"
                        :key="room.name"
                        :active="activeRoom.id === room.id"
                        href="#"
                        @click="onChange(room)">
        # {{ room.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RoomList',
  computed: {
    ...mapState('chat', ['rooms','activeRoom']),
  },
  methods: {
    ...mapActions('chat', ['changeRoom']),
    onChange(room) {
      return this.changeRoom(room.id)
    }
  }
}
</script>