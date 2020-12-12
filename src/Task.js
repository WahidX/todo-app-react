import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Checkbox,
	IconButton,
} from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';

import { fetchTasks, setLocalStorageTasks } from './utility';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 'auto',
		marginTop: 30,
		width: '80%',
		maxWidth: 800,
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function Task() {
	const classes = useStyles();
	const [tasks, setTasks] = useState(fetchTasks());
	const [newTask, setNewTask] = useState('');

	const handleToggle = (task, index) => {
		task.checked = !task.checked;
		tasks[index] = task;
		setTasks([...tasks]);
	};

	const newTaskOnChange = (e) => {
		setNewTask(e.target.value);
	};

	const handleAddTask = (e) => {
		if (newTask.trim().length !== 0) {
			setTasks([
				...tasks,
				{
					content: newTask.trim(),
					checked: false,
				},
			]);
		} else {
			alert('Enter some task!');
		}
		setNewTask('');
	};

	const handleDeleteTask = (taskToDel) => {
		setTasks(
			tasks.filter(function (task) {
				return task !== taskToDel;
			})
		);
	};

	useEffect(() => {
		setLocalStorageTasks(tasks);
	}, [tasks]);

	return (
		<React.Fragment>
			<List className={classes.root}>
				<ListItem key={0}>
					<input
						type="text"
						id="add-task"
						placeholder="Add Task"
						size="1.2rem"
						value={newTask}
						onChange={newTaskOnChange}
					/>
					<ListItemSecondaryAction>
						<IconButton edge="end" aria-label="add" onClick={handleAddTask}>
							<Add />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>

				{tasks.map((task, index) => {
					const labelId = `checkbox-list-label-${index}`;

					return (
						<ListItem
							key={index}
							role={undefined}
							dense
							button
							onClick={() => handleToggle(task, index)}
						>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={task.checked}
									tabIndex={-1}
									disableRipple
								/>
							</ListItemIcon>

							{task.checked && (
								<strike>
									<ListItemText id={labelId} primary={task.content} />
								</strike>
							)}
							{!task.checked && (
								<ListItemText id={labelId} primary={task.content} />
							)}

							<ListItemSecondaryAction>
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={() => handleDeleteTask(task)}
								>
									<Delete />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		</React.Fragment>
	);
}
