<template>
	<div class="container">
		<AddTodo class="mt-5 mb-5" />
		<div class="todos">
			<div class="card border-left-success shadow text-center mb-5" 
				v-for="(todo, index) in todos.todos" :key="index"
				:class="{'is-completed': todo.completed}">
				<div class="card-header">
					<span class="float-left">0:00</span>

					<span><i class="text-warning fas fa-pause"></i></span>

					<a href="#" @click="deleteTodo(todo.id)" class="text-muted float-right">
						<i class="text-danger fas fa-trash"></i>
					</a>
				</div>
				<div class="card-body">
					<h5 class="card-title">{{ todo.title }}</h5>
					<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
				</div>
				<div class="card-footer text-muted">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddTodo from '@/components/Todos/AddTodo';

export default {
	name: "Todos",
	components: {
			AddTodo
	},
	computed: {
		...mapState(['todos']),
	},
	created() {
		this.fetchTodos();
	},
	methods: {
		...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
		onDblClick(todo) { 
			const updTodo =	{
				id: todo.id,
				title: todo.title,
				completed: !todo.completed
			}

			this.updateTodo(updTodo);
		}
	}
}
</script>

<style scoped>

</style>