export function fetchTasks() {
	let tasks = JSON.parse(localStorage.getItem('todo-tasks'));
	if (tasks) {
		return tasks;
	} else {
		localStorage.setItem(
			'todo-tasks',
			JSON.stringify([
				{
					content: 'Sample Task1',
					checked: false,
				},
				{
					content: 'Sample Task2',
					checked: true,
				},
				{
					content: 'Sample Task3',
					checked: false,
				},
			])
		);
		tasks = JSON.parse(localStorage.getItem('todo-tasks'));
		return tasks;
	}
}

export function setLocalStorageTasks(tasks) {
	localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}
