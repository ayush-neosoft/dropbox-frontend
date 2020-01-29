<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-3 col-md-6 mb-4" v-for="user in users" :key="user.id">
        <div class="card shadow h-100 py-2" :class="random(border_colors)">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs text-primary font-weight-bold text-uppercase mb-1">
                  {{user.name}}
                </div>
              </div>
              <div class="col-auto"><i class="fa-2x text-gray-300" :class="random(langs)"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      border_colors: ['border-left-primary', 'border-left-success', 'border-left-info', 'border-left-warning'],
      // text_colors: ['text-primary', 'text-success', 'text-info', 'text-warning'],
      langs: ['fab fa-php', 'fab fa-js', 'fab fa-python', 'fab fa-html5']
    }
  },
  mounted() {
    this.index();
  },
  computed: {
    ...mapState('network', ['users']),
  },
  methods: {
    ...mapActions('network', ['getAllUsers']),
    index() {
      this.getAllUsers()
    },
    random(myArray) {
      return myArray[Math.floor(Math.random()*myArray.length)];
    }
  }
}
</script>

<style>

</style>