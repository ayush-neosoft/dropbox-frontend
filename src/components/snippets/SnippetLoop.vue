<template>
  <div>
    <div class="card shadow mb-5 bg-white rounded" v-for="code in codes" :key="code.id">
      <div class="card-header">

        {{ code.title }}

        <div class="float-right" v-if="code.user_id === $store.state.user.id">
          <span @click="$emit('show', code.id)" class="ml-3">
            <i class="text-warning fa fa-edit"></i>
          </span>
          <span @click="$emit('destroy', code.id)" class="ml-3">
            <i class="text-danger fa fa-trash"></i>
          </span>
        </div>
        <div class="float-right" v-else>
          <span class="ml-3"><i class="text-dark fa fa-code-fork"></i></span>
        </div>
      </div>
      <div class="card-body">
        <div v-html="code.content"></div>
      </div>
      <!-- <div class="card-footer bg-dark text-white">
        <span class="stars" @click="code.stars++">
          <i class="fas fa-star"></i>
        </span>
        {{ code.stars }}
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['codes']
}
</script>