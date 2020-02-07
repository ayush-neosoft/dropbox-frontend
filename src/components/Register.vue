<template>
  <div class="card o-hidden border-0 shadow-lg">
    <div class="card-body p-0">
      <!-- Nested Row within Card Body -->
      <div class="row">
        <div class="col-lg-5 d-none d-lg-block"></div>
        <div class="col-lg-7">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
            </div>
            <form class="user" @submit.prevent="doRegister">
              <div class="form-group row">
                <div
                  class="form-group col-sm-6 mb-3 mb-sm-0"
                  :class="{ 'form-group--error': $v.firstname.$error }"
                >
                  <input
                    class="form__input form-control form-control-user"
                    placeholder="Firstname"
                    v-model.trim="$v.firstname.$model"
                  />

                  <div class="error" v-if="!$v.firstname.required">Field is required</div>
                </div>

                <div
                  class="form-group col-sm-6 mb-3 mb-sm-0"
                  :class="{ 'form-group--error': $v.lastname.$error }"
                >
                  <input
                    class="form__input form-control form-control-user"
                    placeholder="Lastname"
                    v-model.trim="$v.lastname.$model"
                  />

                  <div class="error" v-if="!$v.lastname.required">Field is required</div>
                </div>
              </div>

              <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                <input type="email"
                  class="form__input form-control form-control-user"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email Address..."
                  v-model.trim="$v.email.$model"
                />

                <div class="error" v-if="!$v.email.required">Field is required</div>
                <div
                  class="error"
                  v-if="!$v.email.minLength"
                >Name must have at least {{$v.email.$params.minLength.min}} letters.</div>
              </div>

              <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                <input type="password"
                  class="form__input form-control form-control-user"
                  placeholder="Password"
                  v-model.trim="$v.password.$model"
                />

                <div class="error" v-if="!$v.password.required">Field is required</div>
                <div
                  class="error"
                  v-if="!$v.password.minLength"
                >Name must have at least {{$v.password.$params.minLength.min}} letters.</div>
              </div>

              <div class="form-group" :class="{ 'form-group--error': $v.c_password.$error }">
                <input type="password"
                  class="form__input form-control form-control-user"
                  placeholder="Confirm Password"
                  v-model.trim="$v.c_password.$model"
                />

                <div class="error" v-if="!$v.c_password.sameAsPassword">Passwords must be identical.</div>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary btn-user btn-block"
                :disabled="submitStatus === 'PENDING'"
                >Register Account
              </button>
              <div class="text-center">
                <p class="text-muted small typo__p" v-if="submitStatus === 'OK'">Submitted!</p>
                <p class="text-muted small typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                <p class="text-muted small typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
              </div>

              <button type="button" class="d-none" ref="closeModal" data-dismiss="modal">Cancel</button>
              <!-- <hr>
              <a href="#" class="btn btn-google btn-user btn-block">
                <i class="fab fa-google fa-fw"></i> Register with Google
              </a>
              <a href="#" class="btn btn-facebook btn-user btn-block">
                <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
              </a>-->
            </form>
            <hr />
            <div class="text-center">
              <a class="small" href="#">Forgot Password?</a>
            </div>
            <div class="text-center">
              <a
                class="small"
                href="#"
                @click.prevent="$emit('toggleAuth')"
              >Already have an account? Login!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../apis/Auth";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      c_password: "",
      submitStatus: null
    };
  },
  validations: {
    firstname: {
      required
    },
    lastname: {
      required
    },
    email: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(8)
    },
    c_password: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    formEmpty() {
      this.firstname = "";
      this.lastname = "";
      this.email = "";
      this.password = "";
      this.c_password = "";
    },
    doRegister() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        let name = `${this.firstname} ${this.lastname}`;

        Auth.register({
          name: name,
          email: this.email,
          password: this.password,
          c_password: this.c_password
        })
          .then(response => {
            this.$refs["closeModal"].click();
            this.formEmpty();
            this.$store.dispatch("setUser", response.data.user);
            localStorage.setItem("token", response.data.token);
            this.$toasted.success(response.data.message, { duration: 2000 });
          })
          .catch(error => console.log(error.response.data));

        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    }
  }
};
</script>

<style scoped>
.error {
  font-size: 0.8em;
  color: crimson;
  margin: 5px 10px;
}
</style>