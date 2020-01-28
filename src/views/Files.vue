<template>
	<div class="container">
    <div class="row">

			<!-- Files Upload Form -->
			<div class="col-6 offset-3 mt-3">
				<div v-if="formEnabled">
					<input type="file" id="files" ref="files" multiple @change="handleFileUploads()"/>
					<br>
					<div class="text-center">
						<div @click="addFiles()" class="addFiles">
							<span class="title" style="line-height: 80px">Browse Files</span>
						</div>
					</div>
					<br>
					<ul class="list-group">
						<li class="list-group-item" v-for="(file, index) in files" :key="index">
							{{ file.name }}
							<span class="remove-file" @click="removeFile(index)">x</span>
						</li>
					</ul>	
					<br>
					<div class="text-center">
						<button class="btn btn-success" @click.prevent="submitFiles()">Upload</button>
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
							<th>Select</th>
							<th>Name</th>
							<th>Size</th>
							<th>Uploaded At</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr class="text-center" v-for="file in fileLoop" :key="file.id">
							<td>
								<p-check class="p-svg p-curve" color="success">
									<!-- svg path -->
									<svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
										<path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
													style="stroke: white;fill:white"></path>
									</svg>
								</p-check>
							</td>
							<td>{{ file.title }}</td>
							<td>{{ Math.round(file.size/1024) }} KB</td>
							<td>{{ file.created_at }}</td>
							<td><i class="text-danger fa fa-trash"></i></td>
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
import { mapState } from 'vuex'

export default {
	data(){
		return {
			formEnabled: false,
			files: []
		}
	},
	computed: {
		...mapState({
      baseUrl: state => state.auth.baseUrl,
      token: state => state.auth.token,
			user: state => state.auth.user,
			fileLoop: state => state.files.fileLoop
    })
	},
	mounted() {
		this.fetchFiles();
	},
	methods: {
		async fetchFiles() {
			const response = await this.axios.get(`${this.baseUrl}/api/files`, 
				{ headers: { Authorization: `Bearer ${this.token}` }
			});

			this.$store.dispatch('setFiles', response.data);		
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

		async submitFiles(){
			let formData = new FormData();

			for( var i = 0; i < this.files.length; i++ ){
				let file = this.files[i];

				formData.append('files[' + i + ']', file);
			}

			const response = await this.axios.post(`${this.baseUrl}/api/files`,
				formData, 
				{ headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${this.token}`}}
			);
			console.log(response.data);

			this.$store.dispatch('addFiles', response.data.files);
			this.files = [];
			this.formEnabled = false;
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
