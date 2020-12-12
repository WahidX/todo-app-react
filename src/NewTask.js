import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: '30px 10% 0px 10%',
			width: '80%',
		},
	},
}));

export default function NewTask() {
	function handleSubmit(e) {
		e.preventDefault();
		console.log('Form:', e);
		console.log('clicked');
	}

	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete="off">
			<TextField id="outlined-basic" label="Add Task" variant="outlined" />
			<AddIcon onClick={handleSubmit} />
		</form>
	);
}
