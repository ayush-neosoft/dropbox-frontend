<template>
	<div class="card o-hidden border-0 shadow-lg">
    <div class="card-body p-0">
      <!-- Nested Row within Card Body -->
      <div class="row">
        <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
        <div class="col-lg-7">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
            </div>
            <form class="user">
              <div class="form-group row">
                <div class="col-sm-6 mb-3 mb-sm-0">
                  <input type="text" class="form-control form-control-user" id="exampleFirstName" placeholder="First Name" v-model="register.firstname">
                </div>
                <div class="col-sm-6">
                  <input type="text" class="form-control form-control-user" id="exampleLastName" placeholder="Last Name" v-model="register.lastname">
                </div>
              </div>
              <div class="form-group">
                <input type="email" class="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" v-model="register.email">
              </div>
              <div class="form-group row">
                <div class="col-sm-6 mb-3 mb-sm-0">
                  <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" v-model="register.password">
                </div>
                <div class="col-sm-6">
                  <input type="password" class="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" v-model="register.c_password">
                </div>
              </div>
              <a href="login.html" class="btn btn-primary btn-user btn-block">
                Register Account
              </a>
              <button type="button" class="d-none" ref="closeModal" data-dismiss="modal">Cancel</button>
              <hr>
              <a href="index.html" class="btn btn-google btn-user btn-block">
                <i class="fab fa-google fa-fw"></i> Register with Google
              </a>
              <a href="index.html" class="btn btn-facebook btn-user btn-block">
                <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
              </a>
            </form>
            <hr>
            <div class="text-center">
              <a class="small" href="forgot-password.html">Forgot Password?</a>
            </div>
            <div class="text-center">
              <a class="small" href="#" @click.prevent="$emit('toggleAuth')">Already have an account? Login!</a>
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
      emptyRegisterForm() {
        return {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          c_password: ''
        }
      },
    }
  },
  computed: {
    ...mapState({
      baseUrl: state => state.auth.baseUrl,
    })
  },
  methods: {
    ...mapActions(['setAuth']),
    doRegister() {
      this.axios.post(`${this.baseUrl}/api/register`, {
        name: this.register.firstname + ' ' + this.register.lastname, 
        email: this.register.email, 
        password: this.register.password,
        c_password: this.register.c_password
      }).then(response => {
        console.log(response.data);
        this.clearForm();
        this.$refs["closeModal"].click();
        if(response.data.status) {
          this.setAuth(response.data);
          localStorage.setItem('token', response.data.token);
          this.$toasted.success(response.data.message, {duration: 2000});
        } 
      }).catch(error => console.log(error.response.data));
    },
    clearForm() {
      this.register = this.emptyRegisterForm();
    }
  }
}
</script>