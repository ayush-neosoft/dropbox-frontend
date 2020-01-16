import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Snippets from '../views/Snippets.vue'
import Files from '../views/Files.vue'
import Tasks from '../views/Tasks.vue'
import Network from '../views/Network.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/files',
    name: 'files',
    component: Files
  },
  {
    path: '/snippets',
    name: 'snippets',
    component: Snippets
  },
  {
    path: '/network',
    name: 'network',
    component: Network
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
