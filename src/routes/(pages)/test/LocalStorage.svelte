<script lang="ts">
	import { Button, Card } from "@kayord/ui";

	interface Todo {
		id: number;
		text: string;
		done: boolean;
	}

	let todos = $state<Todo[]>([]);

	$effect(() => {
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
			todos = JSON.parse(savedTodos);
		}
	});

	$effect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	});

	const addTodo = () => {
		todos = [...todos, { id: Date.now(), text: randomText(), done: false }];
	};

	const randomText = () => {
		return Math.random().toString(36).substring(2, 5);
	};
</script>

<div>LocalStorage</div>
<Button onclick={addTodo}>Add Random Todo</Button>

{#each todos as todo}
	<Card.Root class="p-2">
		<div>{todo.text}</div>
	</Card.Root>
{/each}
