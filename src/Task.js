import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

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
		setTasks([
			...tasks,
			{
				content: newTask,
				checked: false,
			},
		]);
	};

	const handleDeleteTask = (taskToDel) => {
		console.log('del');
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
						<AddIcon />
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
						<ListItemText id={labelId} primary={task.content} />
						<ListItemSecondaryAction>
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() => handleDeleteTask(task)}
							>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				);
			})}
		</List>
	);
}
