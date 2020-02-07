<template>
	<div class="container">
		<div class="add my-5">
			<form @submit.prevent="store()">
				<div class="input-group input-group-lg">
					<input type="text" class="form-control bg-white small" v-model="content" placeholder="Add a task..." aria-label="Search" aria-describedby="basic-addon2">
					<div class="input-group-append">
						<a class="btn btn-primary" type="submit" @click.prevent="store()">
							<i class="text-white fas fa-plus"></i>
						</a>
					</div>
				</div>
			</form>
		</div>
		<div class="todos">
			<div class="card border-left-success shadow text-center mb-5" 
				v-for="task in taskLoop" :key="task.id">
				<div class="card-header">
					<!-- <span class="float-left">0:00</span> -->
					<span class="float-left" v-text="formatDate(task.created_at)"></span>
					<!-- <span><i class="text-warning fas fa-pause"></i></span> -->
					<a href="#" @click="destroy(task.id)" class="text-muted float-right">
						<i class="text-danger fas fa-trash"></i>
					</a>
				</div>
				<div class="card-body">
					<!-- <h5 class="card-title">{{ task.content }}</h5> -->
					<p class="card-text">{{ task.content }}</p>
				</div>
				<!-- <div class="card-footer text-muted"></div> -->
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: "Tasks",
	data() {
		return {
			content: ''
		}
	},
	computed: {
		...mapState('tasks', ['taskLoop']),
	},
	mounted() {
		this.index();
	},
	methods: {
		...mapActions('tasks', [
				'getAllTasks',
				'getOneTask', 
				'saveTask',
				'updateTask',
				'deleteTask'
			]),

		index() {
			this.getAllTasks();
		},
		show(id) {
			this.getOneTask(id);
		},
		store() {
			if(this.content.length >= 3) {
				let data = {'content' : this.content}
				this.saveTask(data);
				this.content = '';
			} else {
				this.$toasted.error('Atleast 3 characters', {duration: 2000});
			}
		},
		update(id) {
			this.updateTask(id, this.content);
		},
		destroy(id) {
			this.deleteTask(id);
		},
		formatDate(date) {
			const months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];
			const days = [
				'Sun',
				'Mon',
				'Tue',
				'Wed',
				'Thu',
				'Fri',
				'Sat'
			];
			let d = new Date(date);
			return `${d.getHours()}:${d.getMinutes()} on ${days[d.getDay()]} ${d.getDate()}, ${months[d.getMonth()]} ${d.getFullYear()}`
		}
	}
}
</script>

<style scoped>

</style>