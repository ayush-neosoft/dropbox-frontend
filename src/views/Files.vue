<template>
	<div class="container">
    <div class="row">

			<!-- Files Upload Form -->
			<div class="col-6 offset-3 mt-3">
				<div v-if="formEnabled">
					<input type="file" id="files" ref="files" multiple @change="form_handle()"/>
					<br>
					<div class="text-center">
						<div @click="form_add()" class="addFiles">
							<span class="title" style="line-height: 80px">Browse Files</span>
						</div>
					</div>
					<br>
					<ul class="list-group">
						<li class="list-group-item" v-for="(file, index) in files" :key="index">
							{{ file.name }}
							<span class="remove-file" @click="form_remove(index)">x</span>
						</li>
					</ul>	
					<br>
					<div class="text-center">
						<button class="btn btn-success" @click.prevent="store()">Upload</button>
					</div>
				</div>
				<div class="text-center mt-5" v-if="fileLoop.length === 0">
					<p class="text-muted">No Files Yet...</p>  
				</div>
			</div>

			<!-- Files Loop -->
			<div class="col-10 offset-1 mt-3">
				<table class="table">
					<thead>
						<tr class="text-center">
							<th><p-check color="primary" v-model="selectAll"></p-check></th>
							<th>Name</th>
							<th>Size</th>
							<th>Uploaded At</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr class="text-center" v-for="file in fileLoop" :key="file.id">
							<td><p-check color="primary" v-model="selected" :value="file.id"></p-check></td>
							<td>
								<span class="text-primary"
									style="cursor:pointer"
									@click="downloadWithVueResource(file.path, file.title)">
									{{ file.title }}
								</span>
							</td>
							<td>{{ Math.round(file.size/1024) }} KB</td>
							<td>{{ file.created_at }}</td>
							<td><span @click="destroy(file.id)"><i class="text-danger fas fa-trash"></i></span></td>
						</tr>
					</tbody>
				</table>
			</div>
			<a href="#" class="float" @click="formEnabled = !formEnabled">
				<i class="fa fa-plus my-float"></i>
			</a>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	data(){
		return {
			formEnabled: false,
			files: [],
			selected: []
		}
	},
	computed: {
		...mapState('files', ['fileLoop']),
		selectAll: {
			get() {
					return this.fileLoop ? this.selected.length == this.fileLoop.length : false;
			},
			set(value) {
					var selected = [];

					if (value) {
						this.fileLoop.forEach((e) => { selected.push(e.id) });
					}

					this.selected = selected;
			}
		},
	},
	mounted() {
		this.index();
	},
	methods: {
		...mapActions('files', [
        'getAllFiles',
        'saveFile',
        'deleteFile'
			]),
			
		form_add() {
			this.$refs.files.click();
		},
		form_remove(key) {
			this.files.splice( key, 1 );
		},
		form_handle(){
			let uploadedFiles = this.$refs.files.files;

			for( var i = 0; i < uploadedFiles.length; i++ ){
				this.files.push( uploadedFiles[i] );
			}
		},

		index() {
				this.getAllFiles()
		},
		store(){
			let formData = new FormData();
			for( var i = 0; i < this.files.length; i++ ){
				let file = this.files[i];

				formData.append('files[' + i + ']', file);
			}

			this.saveFile(formData);
			this.files = [];
			this.formEnabled = false;
		},
		destroy(id) {
			if(confirm('Are you sure?')) {
				this.deleteFile(id)
			}
		},

		// File Download Methods
		forceFileDownload(response, title) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', title) //or any other extension
      document.body.appendChild(link)
      link.click()
    },
    
    downloadWithVueResource(link, title) {
      this.$http({
        method: 'get',
        url: `http://127.0.0.1:8000/download/${link}`,
        responseType: 'arraybuffer'
      })
      .then(response => {
        this.forceFileDownload(response, title)  
      })
      .catch(() => console.log('error occured'))
    },
	}
}
</script>


<style scoped>
  input[type="file"]{
    position: absolute;
    top: -500px;
  }

	div.file-listing{
    width: 200px;
  }

  span.remove-file{
    color: red;
    cursor: pointer;
    float: right;
		font-weight: 700;
  }

	.addFiles {
		cursor: pointer;
		border: 1px dashed black;
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
