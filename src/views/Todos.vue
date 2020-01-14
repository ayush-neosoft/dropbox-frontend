<template>
	<div>
		<AddTodo class="mt-5 mb-5" />
		<div class="todos">
			<div class="card text-center" v-for="(todo, index) in todos.todos" :key="index"
				:class="{'is-completed': todo.completed}">
				<div class="card-header">
					<a href="#" @click="deleteTodo(todo.id)" class="text-danger float-right">
						<i class="fa fa-trash"></i>
					</a>
				</div>
				<div class="card-body">
					<h5 class="card-title">{{ todo.title }}</h5>
					<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
				</div>
				<div class="card-footer text-muted">
					2 days ago
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddTodo from '@/components/AddTodo';

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
.todos {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 1rem;
}
</style>