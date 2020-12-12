import React, { useState } from 'react';

import ButtonAppBar from './AppBar';
import Task from './Task';

function App(props) {
	const [currentTime, setTime] = useState(new Date().toLocaleTimeString());

	// setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);

	return (
		<div>
			<ButtonAppBar />
			<div id="clock">{currentTime}</div>
			<Task />
		</div>
	);
}

export default App;
