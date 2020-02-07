<template>
  <div class="container">
    <div class="row mt-3" v-if="isEmptyObj(focused)">
      <div class="col">
        <select name="" id="" class="form-control">
          <option value="">--- Sort by name ---</option>
          <option value="">Ascending</option>
          <option value="">Descending</option>
        </select>
      </div>
      <div class="col">
        <select name="" id="" class="form-control">
          <option value="">--- Sort by popularity ---</option>
          <option value="">Ascending</option>
          <option value="">Descending</option>
        </select>
      </div>
      <div class="col">
        <select name="" id="" class="form-control">
          <option value="">--- Sort by team ---</option>
          <option value="">PHP</option>
        </select>
      </div>
    </div>
    <div class="mt-3" v-else>
      <span class="float-right mr-3" style="cursor: pointer" @click="back()">
        <i class="far fa-window-close fa-2x"></i>
      </span>
    </div>
    
    <!-- Userlist View -->
    <div class="row mt-3" v-if="isEmptyObj(focused)">
      <div class="col-xl-3 col-md-6 mb-4" v-for="user in users" :key="user.id">
        <div class="card shadow h-100 py-2" 
          :class="random(border_colors)" 
          @click="show(user.id)">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs text-primary font-weight-bold text-uppercase mb-1">
                  {{user.name}}
                </div>
              </div>
              <div class="col-auto"><i class="fa-2x text-gray-300" :class="user.team.icon"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile View -->
    <div class="row" v-else>
      <div class="col-3">
        <i class="fa-10x text-gray-300" :class="focused.team.icon"></i>
        <p>{{ focused.name }}</p>
      </div>
      <div class="col-9">
        <ul class="nav nav-tabs mt-3">
          <li class="nav-item">
            <a class="nav-link active" href="#">Overview</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="currentComponent='SnippetLoop'">Snippets 
              <span class="badge badge-dark">{{ focused.snippets.length }}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Followers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Following</a>
          </li>
        </ul>

        <component :is="currentComponent" v-bind="currentProperties"></component>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Overview from '@/components/network/Overview'
import SnippetLoop from '@/components/snippets/SnippetLoop'

export default {
  components: {
    Overview, SnippetLoop
  },
  data() {
    return {
      currentComponent: Overview,
      border_colors: ['border-left-primary', 'border-left-success', 'border-left-info', 'border-left-warning'],
      // text_colors: ['text-primary', 'text-success', 'text-info', 'text-warning'],
    }
  },
  mounted() {
    this.index();
  },
  computed: {
    ...mapState('network', [
        'users', 
        'focused',
        'tab'
      ]),

    ...mapState('snippets', [
        'codeLoop',
      ]),
      currentProperties() {
        if (this.currentComponent === 'SnippetLoop') {
          return { codes: this.codeLoop }
        }
        return {};
      }
  },
  methods: {
    ...mapActions('network', ['getAllUsers', 'getOneUser', 'setFocus']),
    async index() {
      await this.getAllUsers()
    },
    show(id) {
      this.getOneUser(id)
    },
    back() {
      this.setFocus({})
    },
    random(myArray) {
      return myArray[Math.floor(Math.random()*myArray.length)];
    }
  }
}
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>