<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-lg-8 col-md-6">
                  <h3 class="mb-0 text-truncated">Mike Mandolin</h3>
                  <p class="lead">Web / UI Designer</p>
                  <p>
                    I love to read, hang out with friends, watch football, listen to music, and learn new things.
                  </p>
                  <p>  
                    <span class="badge badge-info tags">html5</span> 
                    <span class="badge badge-info tags">css3</span>
                    <span class="badge badge-info tags">nodejs</span>
                  </p>
              </div>
              <div class="col-12 col-lg-4 col-md-6 text-center">
                <img src="https://robohash.org/68.186.255.198.png" alt="" class="mx-auto rounded-circle img-fluid">
                <br>
                <div class=" ml-3">
                  <star-rating
                    :star-size="20"
                    :show-rating="false"
                    :rating="4" 
                    :read-only="true"
                  ></star-rating>
                </div>
              </div>
              <div class="col-12 col-lg-4">
                  <h3 class="mb-0">20.7K</h3>
                  <small>Followers</small>
                  <button class="btn btn-block btn-outline-success"><span class="fa fa-plus-circle"></span> Follow</button>
              </div>
              <div class="col-12 col-lg-4">
                  <h3 class="mb-0">245</h3>
                  <small>Following</small>
                  <button class="btn btn-outline-info btn-block"><span class="fa fa-user"></span> View Profile</button>
              </div>
              <div class="col-12 col-lg-4">
                  <h3 class="mb-0">43</h3>
                  <small>Snippets</small>
                  <button type="button" class="btn btn-outline-primary btn-block"><span class="fa fa-gear"></span> Options</button>
              </div>
              <!--/col-->
            </div>
            <!--/row-->
          </div>
          <!--/card-block-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import {  mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      rating: 0
    }
  },
  components: {
    StarRating
  },
  mounted() {
    this.fetchUsers();
  },
  computed: {
    ...mapState({
      baseUrl: state => state.auth.baseUrl,
      token: state => state.auth.token,
      users: state => state.network.users,
    })
  },
  methods: {
    ...mapActions(['setUsers']),
    async fetchUsers() {
      const response = await this.axios.get(`${this.baseUrl}/api/users`, { headers: { Authorization: `Bearer ${this.token}` } });
      console.log(response.data)
      this.setUsers(response.data);
    }
  }
}
</script>

<style>

</style>