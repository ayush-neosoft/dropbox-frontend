<template>
	<div class="card o-hidden border-0 shadow-lg">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
        <div class="col-lg-6">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
            </div>
            <form class="user">
              <div class="form-group">
                <input type="email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." v-model="login.email">
              </div>
              <div class="form-group">
                <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" v-model="login.password">
              </div>
              <div class="form-group">
                <div class="custom-control custom-checkbox small">
                  <input type="checkbox" class="custom-control-input" id="customCheck">
                  <label class="custom-control-label" for="customCheck">Remember Me</label>
                </div>
              </div>
              <a href="#" @click.prevent="doLogin()" class="btn btn-primary btn-user btn-block">
                Login
              </a>
              <button type="button" class="d-none" ref="closeModal" data-dismiss="modal">Cancel</button>
              <hr>
              <a href="#" class="btn btn-google btn-user btn-block">
                <i class="fab fa-google fa-fw"></i> Login with Google
              </a>
              <a href="#" class="btn btn-facebook btn-user btn-block">
                <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
              </a>
            </form>
            <hr>
            <div class="text-center">
              <a class="small" href="#">Forgot Password?</a>
            </div>
            <div class="text-center">
              <a class="small" href="#" @click.prevent="$emit('toggleAuth')">Create an Account!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../apis/Auth'

export default {
	data() {
    return {
      login: this.emptyLoginForm(),
    }
  },

  methods: {
    emptyLoginForm() {
      return {
        email: '',
        password: ''
      }
    },
    doLogin() {
      let credentials = {
        'email': this.login.email,
        'password': this.login.password
      }

      Auth.login(credentials).then(response => {
        console.log(response.data);
        this.login = this.emptyLoginForm();
        this.$refs["closeModal"].click();
        if(response.data.status) {
          localStorage.setItem('token', response.data.token);
          this.$store.dispatch('setUser', response.data.user);
          this.$toasted.success(response.data.message, {duration: 2000});
        } 
      });
    }
  }
}
</script>