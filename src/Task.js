import React from 'react';
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
	const [checked, setChecked] = React.useState([0]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<List className={classes.root}>
			<ListItem key={0} role={undefined} dense button onClick={handleToggle(0)}>
				<input type="text" id="add-task" placeholder="Add Task" />
				<ListItemSecondaryAction>
					<IconButton edge="end" aria-label="comments">
						<AddIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>

			{['new', 'hello', 2, 3].map((value) => {
				const labelId = `checkbox-list-label-${value}`;

				return (
					<ListItem
						key={value}
						role={undefined}
						dense
						button
						onClick={handleToggle(value)}
					>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={checked.indexOf(value) !== -1}
								tabIndex={-1}
								disableRipple
								inputProps={{ 'aria-labelledby': labelId }}
							/>
						</ListItemIcon>
						<ListItemText id={labelId} primary={value} />
						<ListItemSecondaryAction>
							<IconButton edge="end" aria-label="comments">
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				);
			})}
		</List>
	);
}
