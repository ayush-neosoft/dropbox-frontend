<template>
  <div class="home">
    <Dropbox />
  </div>
</template>

<script>
// @ is an alias to /src
import Dropbox from '@/components/Dropbox'

export default {
  name: 'home',
  components: {
    Dropbox
  }
}
</script>
