<template>
	<div>
		<div class="add">
			<form @submit="onSubmit">
				<div class="input-group input-group-lg">
					<input type="text" class="form-control bg-white small" v-model="title" placeholder="Add a task..." aria-label="Search" aria-describedby="basic-addon2">
					<div class="input-group-append">
						<a class="btn btn-primary" type="submit">
							<i class="text-white fas fa-plus"></i>
						</a>
					</div>
				</div>
			</form>
		</div>
	</div>
</template> 

<script>
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			title: ''
		}
	},
	methods: {
		...mapActions(['addTodo']),
		onSubmit(e) {
			e.preventDefault();
			this.addTodo(this.title); 
		}
	}
}
</script>

<style scoped>

</style>