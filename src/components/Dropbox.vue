<template>
  <div class="container">
    <div class="row">
			<div class="col-6 offset-3 mt-3">
				<input type="file" id="files" ref="files" multiple @change="handleFileUploads()"/>
			</div>
			<br>
			<div class="col-6 offset-3">
      	<div v-for="(file, index) in files" :key="index" class="file-listing">
					{{ file.name }} <span class="remove-file" @click="removeFile(index)">Remove</span>
				</div>
    	</div>
    	<br>
			<div class="col-6 offset-3">
				<button @click="addFiles()">Add Files</button>
			</div>
    	<br>
			<div class="col-6 offset-3">
				<button class="btn btn-primary" v-on:click="submitFiles()">Upload</button>
			</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data(){
		return {
			files: [],
			mySpace: {},
		}
	},
	mounted() {
		if(this.loggedIn) {
			this.getSpace();
		}
	},
	computed: {
		...mapState([
			'loggedIn',
			'baseUrl',
			'token'
    ])
	},
	methods: {
		getSpace() {
			this.axios.get(`${this.baseUrl}/api/spaces`, 
				{ headers: { Authorization: `Bearer ${this.token}` }
			}).then(response => {
				if(response.data.status) {
					this.mySpace = response.data.content;
				}
			}).catch(error => console.log(error.response.data));
		},
		addFiles(){
			this.$refs.files.click();
		},
		removeFile( key ){
			this.files.splice( key, 1 );
		},
		handleFileUploads(){
			let uploadedFiles = this.$refs.files.files;

			for( var i = 0; i < uploadedFiles.length; i++ ){
				this.files.push( uploadedFiles[i] );
			}
		},
		submitFiles(){
			let formData = new FormData();

			for( var i = 0; i < this.files.length; i++ ){
				let file = this.files[i];

				formData.append('files[' + i + ']', file);
			}

			this.axios.post(`${this.baseUrl}/api/files`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${this.token}`
					}
				}
			).then((response) => {
				console.log(response.data);
				this.files = [];
			})
			.catch((error) => {
				console.log(error.response.data);
			});
		},
	}
}
</script>

<style>
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
  }
</style>
