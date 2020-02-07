<template>
  <div id="app">
    
    <div id="wrapper">
      <!-- Extra large modal -->
      <button type="button" class="d-none btn btn-primary" ref="authModal" data-toggle="modal" data-target="#auth-modal">Auth Modal</button>

      <div id="auth-modal" class="modal fade" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content"> 
            <span v-if="loginMode">
              <Login @toggleAuth="loginMode = !loginMode" />
            </span>
            <span v-else>
              <Register @toggleAuth="loginMode = !loginMode" />
            </span>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item">
          <router-link class="nav-link" to="/" >
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
          Modules 
        </div>

        <!-- Nav Item - Charts -->
        <li class="nav-item">
          <router-link class="nav-link" to="/snippets">
            <i class="fas fa-fw fa-code"></i>
            <span>Snippets</span>
          </router-link>
        </li>

        <!-- Nav Item - Tables -->
        <li class="nav-item">
          <router-link class="nav-link" to="/files">
            <i class="fas fa-fw fa-file"></i>
            <span>Files</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/tasks">
            <i class="fas fa-fw fa-tasks"></i>
            <span>Tasks</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/network">
            <i class="fas fa-fw fa-users"></i>
            <span>Network</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/chat">
            <i class="fas fa-fw fa-comments"></i>
            <span>Chat</span>
          </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

      </ul>
      <!-- End of Sidebar -->

      <div id="content-wrapper" class="d-flex flex-column">

        <!-- Main Content -->
        <div id="content">

          <!-- Topbar -->
          <Topbar @triggerModal="$refs.authModal.click()" />
          <!-- End of Topbar -->

          <router-view></router-view>
        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; 2020</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->

      </div>
    </div>
  </div>
</template>

<script>
  import Topbar from '@/components/Topbar'
  import Login from '@/components/Login'
  import Register from '@/components/Register'
  import Auth from '@/apis/Auth'
  
  export default {
    name: 'app',
    components: {
      Login, Register, Topbar
    },
    data() {
      return {
        loginMode: true,
      }
    },
    mounted() {
      this.checkAuth();
    },
    methods: {
      checkAuth() {
        if (localStorage.getItem('token')) {
          Auth.me().then(response => {
            this.$store.dispatch('setUser', response.data.user)
          })
        } else {
          this.$refs.authModal.click()
        }
      },
    }
  }
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
