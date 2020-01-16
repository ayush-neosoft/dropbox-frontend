<template>
  <div class="container home">
    <h1 class="text-center mt-3">Modules</h1>
    <div class="row text-center mt-3">
      <div class="module col-4"><span class="module-title">Todos</span>
        <router-link to="/todos"><i class="fa fa-check fa-4x"></i></router-link>
      </div>
      <div class="module col-4"><span class="module-title">Files</span>
        <router-link to="/files"><i class="fa fa-file-o fa-4x"></i></router-link>
      </div>
      <div class="module col-4"><span class="module-title">Tasks</span>
        <router-link to="/tasks"><i class="fa fa-tasks fa-4x"></i></router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Dropbox from '@/components/Dropbox'

export default {
  name: 'home',
  components: {
    // Dropbox
  }
}
</script>

<style scoped>
.module {
  color: #fff;
  border: 8px solid #fff;
  background: #4b6cb7;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #182848, #4b6cb7);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #182848, #4b6cb7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 200px;
}

.module-title {
  font-weight: 700;
  font-size: 28px;
  font-family: 'Ubuntu', sans-serif;
}

i {
  color: #fff;
  display: block;
  margin-top: 30px;
}
</style>
