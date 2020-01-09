<template>
  <div id="app">
    <Navbar 
      :baseUrl="baseUrl"
      :isEmpty="isEmpty" />

    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  export default {
    name: 'app',
    components: {
      Navbar
    },
    data() {
      return {
        baseUrl: 'http://127.0.0.1:8000',
      }
    },
    mounted() {
      //
    },
    methods: {
      isEmpty(obj) {
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop)) {
            return false;
          }
        }
        return JSON.stringify(obj) === JSON.stringify({});
      },
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
