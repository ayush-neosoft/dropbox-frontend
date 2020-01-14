import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Todos from '../views/Todos.vue'
import Files from '../views/Files.vue'
import Tasks from '../views/Tasks.vue'
import Chats from '../views/Chats.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/todos',
    name: 'todos',
    component: Todos
  },
  {
    path: '/files',
    name: 'files',
    component: Files
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/chats',
    name: 'chats',
    component: Chats
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
