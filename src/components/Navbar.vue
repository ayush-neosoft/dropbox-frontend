<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <router-link class="navbar-brand" to="/">
      Dropbox <sub>vue</sub>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav m-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/todos">Todos</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/files">Files</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/tasks">Tasks</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/chats">Chats</router-link>
        </li>
      </ul>
      
      <ul class="navbar-nav ml-auto mr-5">
        <span v-if="isEmptyObj(user)">
          <li class="nav-item">
            <a href="#" class="nav-link" data-toggle="modal" data-target="#staticBackdrop" @click="authModal='login'">Login</a>
          </li>
        </span>
        <span v-else>
          <!-- <li class="nav-item">
              <a class="nav-link"><i class="fa fa-bell-o fa-lg" aria-hidden="true"></i></a>
          </li> -->

          <li class="nav-item dropdown">
              <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{user.name}} <span class="caret"></span>
              </a>

              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <router-link class="dropdown-item" to="/settings"><i class="fa fa-cog" aria-hidden="true"></i> Settings</router-link>
                  <a class="dropdown-item" @click.prevent="doLogout"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
              </div>
          </li>
        </span>
      </ul>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">

          <div class="modal-body" v-if="authModal=='login'">
            <form class="row mt-5">
              <div class="form-group col-8 offset-2">
                <input type="text" class="form-control" placeholder="Email" v-model="login.email">
              </div>
              <div class="form-group col-8 offset-2">
                <input type="password" class="form-control" placeholder="Password" v-model="login.password">
              </div>
            </form>
            <div class="text-center">
              <button type="button" class="btn btn-sm btn-success" @click="doLogin(login)">Login</button>
              <button type="button" class="btn btn-sm btn-secondary ml-2" ref="closeModal" data-dismiss="modal" @click="cancel">Cancel</button>
            </div>
          </div>

          <div class="modal-body" v-if="authModal=='register'">
            <form class="row mt-5">
              <div class="form-group col-8 offset-2">
                <input type="text" class="form-control" placeholder="Name" v-model="register.name">
              </div>
              <div class="form-group col-8 offset-2">
                <input type="email" class="form-control" placeholder="Email" v-model="register.email">
              </div>
              <div class="form-group col-8 offset-2">
                <input type="password" class="form-control" placeholder="Password" v-model="register.password">
              </div>
              <div class="form-group col-8 offset-2">
                <input type="password" class="form-control" placeholder="Confirm Password" v-model="register.c_password">
              </div>
            </form>
            <div class="text-center">
              <button type="button" class="btn btn-sm btn-success" @click="doRegister">Sign Up</button>
              <button type="button" class="btn btn-sm btn-secondary ml-2" data-dismiss="modal" @click="cancel">Cancel</button>
            </div>
          </div>

          <div class="text-center mt-2 mb-3" style="font-size:0.8em">
            <a href="#" class="text-decoration-none" @click="auth_modal('register')" 
            v-if="authModal=='login'">New to Dropbox? SIGN UP</a>
            <a href="#" class="text-decoration-none" @click="auth_modal('login')" v-if="authModal=='register'">Already on Dropbox? LOG IN</a>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 8px;
}

.nav-link:hover {
  color: #FFF !important;
  background-color: lightgreen;
}
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      authModal: '',
      login: this.emptyLoginForm(),
      register: this.emptyRegisterForm(),
    }
  },
  mounted() {
    this.checkAuth();
  },
  computed: {
    ...mapState({
      baseUrl: state => state.auth.baseUrl,
      token: state => state.auth.token,
      user: state => state.auth.user
    })
  },
  methods: {
    ...mapActions(['fetchToken', 'authenticate']),
    auth_modal(method){
      this.authModal = method;
    },
    emptyLoginForm() {
      return {
        email: '',
        password: ''
      }
    },
    emptyRegisterForm() {
      return {
        name: '',
        email: '',
        password: '',
        c_password: ''
      }
    },
    checkAuth() {
      if (localStorage.getItem('token')) {
        try {
          this.$store.dispatch('localToken', localStorage.getItem('token'))
        } catch(e) {
          localStorage.removeItem('token');
        }
      }
      this.axios.get(`${this.baseUrl}/api/me`, { headers: { Authorization: `Bearer ${this.token}` } }).then(response => {
        this.$store.dispatch('authenticate', response.data)
      })
    },
    doLogin() {
      this.axios.post(`${this.baseUrl}/api/login`, {
        email: this.login.email, 
        password: this.login.password
      }).then(response => {
        console.log(response.data);
        this.$refs["closeModal"].click();
        if(response.data.status) {
          this.$store.dispatch('authenticate', response.data);
          localStorage.setItem('token', response.data.token);
          this.$toasted.success(response.data.message, {duration: 2000});
        } 
      }).catch(error => console.log(error.response.data));
    },
    doRegister() {
      this.axios.post(`${this.baseUrl}/api/register`, {
        name: this.register.name, 
        email: this.register.email, 
        password: this.register.password,
        c_password: this.register.c_password
      }).then(response => {
        console.log(response.data);
        this.$refs["closeModal"].click();
        if(response.data.status) {
          this.$store.dispatch('authenticate', response.data);
          this.$toasted.success(response.data.message, {duration: 2000});
        } 
      }).catch(error => console.log(error.response.data));
    },
    doLogout() {
      let payload = {
        user: {},
        token: null
      }
      this.$store.dispatch('authenticate', payload);
      localStorage.removeItem('token');
      this.$toasted.show('Logout Successful', {duration: 2000});
    },
    cancel() {
      this.login = this.emptyLoginForm();
      this.register = this.emptyRegisterForm();
    }
  },
  watch: {
    token() {
      localStorage.token = this.token;
    }
  }
}
</script>