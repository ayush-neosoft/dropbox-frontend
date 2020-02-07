<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-10 offset-1">
        <div class="form mb-5" v-if="createMode">
          <div class="form-group">
            <input type="text" class="form-control" v-model="snippet.title" placeholder="Give a title to your snippet...">
          </div>
          <div class="form-group text-center">
            <p-check color="primary">Make this private</p-check>
            <p-check color="primary">Pin to top</p-check>
          </div>
          <vue-editor v-model="snippet.content" :editorToolbar="customToolbar"></vue-editor>
          <div class="text-center mt-3">
            <button class="btn btn-success form-control" @click="store()">Save</button>
          </div>
        </div>
        <div class="form mb-5" v-else-if="editMode">
          <div class="form-group">
            <input type="text" class="form-control" v-model="focused.title" placeholder="Give a title to your snippet...">
          </div>
          <div class="form-group text-center">
            <p-check color="primary" v-model="focused.is_private">Make this private</p-check>
            <p-check color="primary" v-model="focused.is_pinned">Pin to top</p-check>
          </div>
          <vue-editor v-model="focused.content" :editorToolbar="customToolbar"></vue-editor>
          <div class="text-center mt-3">
            <button class="btn btn-success form-control" @click="update()">Update</button>
          </div>
        </div>
        
        <div v-else>
          <SnippetLoop :codes="codeLoop" @show="show" @destroy="destroy" />
        </div>

        <div class="text-center mt-5" v-if="codeLoop.length === 0">
          <p class="text-muted">No Snippets Yet...</p>  
        </div>
      </div>
    </div>

    <a href="#" class="float" @click="createMode = !createMode">
      <i class="fa fa-plus my-float"></i>
    </a>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState, mapActions } from 'vuex';
import SnippetLoop from '@/components/snippets/SnippetLoop'

export default {
  components: {
    VueEditor,
    SnippetLoop
  },
  data() {
    return {
      createMode: false,
      editMode: false,
      snippet: {
        title: '',
        content: ''
      },
      customToolbar: [["code-block"]],
    }
  },
  mounted() {
    this.index();
  },
  computed: {
    ...mapState('snippets', ['codeLoop', 'focused']),
  },
  methods: {
    ...mapActions('snippets', [
        'getAllSnippets',
        'getOneSnippet',
        'saveSnippet', 
        'updateSnippet',
        'deleteSnippet'
      ]),

    index() {
      this.getAllSnippets();
    },
    show(id) {
      this.getOneSnippet(id);
      this.editMode = true;
    },
    store() {
      this.saveSnippet(this.snippet);
      this.snippet = {title: '', content: ''},
      this.createMode = false;
    },
    update() {
      this.updateSnippet(this.focused);
      this.editMode = false;
    },
    destroy(id) {
      if(confirm('Are you sure?')) {
        this.deleteSnippet(id);
      }
    }
  }
}
</script>

<style scoped>
  .stars {
    cursor: pointer;
  }

  .float{
    position:fixed;
    width:60px;
    height:60px;
    bottom:40px;
    right:40px;
    background-color:#4e73df;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px #999;
  }

  .my-float{
    margin-top:22px;
  }
</style>