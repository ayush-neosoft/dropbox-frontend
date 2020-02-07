<template>
  <div class="login">
    <b-container>
      <b-row class="mt-5">
        <b-col lg="4" md="3"></b-col>
        <b-col lg="4" md="6">
          <LoginForm />
        </b-col>
        <b-col lg="4" md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from '@/components/chat/LoginForm.vue'

export default {
  name: 'login',
  components: {
    LoginForm
  }
}
</script>