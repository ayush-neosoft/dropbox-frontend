<template>
	<div class="card o-hidden border-0 shadow-lg">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-6 d-none d-lg-block"></div>
        <div class="col-lg-6">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
            </div>

            <form @submit.prevent="doLogin" class="user">
              <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                <input type="email" class="form__input form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." v-model.trim="$v.email.$model"/>

                <div class="error" v-if="!$v.email.required">Field is required</div>
                <div class="error" v-if="!$v.email.minLength">Name must have at least {{$v.email.$params.minLength.min}} letters.</div>
              </div>

              <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                <input type="password" class="form__input form-control form-control-user" id="exampleInputPassword" placeholder="Password" v-model.trim="$v.password.$model"/>

                <div class="error" v-if="!$v.password.required">Field is required</div>
                <div class="error" v-if="!$v.password.minLength">Name must have at least {{$v.email.$params.minLength.min}} letters.</div>
              </div>

              <div class="form-group">
                <div class="custom-control custom-checkbox small">
                  <input type="checkbox" class="custom-control-input" id="customCheck">
                  <label class="custom-control-label" for="customCheck">Remember Me</label>
                </div>
              </div>
              <button type="submit" :disabled="submitStatus === 'PENDING'" class="btn btn-primary btn-user btn-block">Login</button>
              <div class="text-center">
                <p class="text-muted small typo__p" v-if="submitStatus === 'OK'">Submitted!</p>
                <p class="text-muted small typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                <p class="text-muted small typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
              </div>

              <button type="button" class="d-none" ref="closeModal" data-dismiss="modal">Cancel</button>
              <!-- <hr>
              <a href="#" class="btn btn-google btn-user btn-block">
                <i class="fab fa-google fa-fw"></i> Login with Google
              </a>
              <a href="#" class="btn btn-facebook btn-user btn-block">
                <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
              </a> -->
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
import { required, minLength } from 'vuelidate/lib/validators'

export default {
	data() {
    return {
      email: '',
      password: '',
      submitStatus: null
    }
  },

  validations: {
    email: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },

  methods: {
    formEmpty() {
      this.email = '';
      this.password = '';
    },
    doLogin() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        Auth.login({email: this.email, password: this.password}).then(response => {
          this.$refs["closeModal"].click();
          this.formEmpty();
          localStorage.setItem('token', response.data.token);
          this.$store.dispatch('setUser', response.data.user);
          this.$toasted.success(response.data.message, {duration: 2000});
          this.$router.push('/');
        }).catch(error => {
          this.$toasted.error(error.response.data.message, {duration: 2000});
        });

        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
.error {
  font-size: 0.8em;
  color: crimson;
  margin: 5px 10px;
}
</style>