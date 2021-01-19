import React, { useState, useEffect, useRef } from 'react';
import BigText from './components/BigText';

import './App.css';

function useInterval(callback, delay) {
	const savedCallback = useRef();
  
	useEffect(() => {
	  savedCallback.current = callback;
	});
  
	useEffect(() => {
	  function tick() {
		savedCallback.current();
	  }
  
	  let id = setInterval(tick, delay);
	  return () => clearInterval(id);
	}, [delay]);
}

function App() {
	const [currentDateTime, setCurrentDateTime] = useState(new Date())
	const [days, setDays] = useState(0)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)

	const newYears = '1 Jan 2022';
	const newYearsDate = new Date(newYears);

	useInterval( () => {
		setCurrentDateTime(new Date());
	}, 1000);

	useEffect(() => {
		const totalSeconds = (newYearsDate - currentDateTime) / 1000;

		function formatTime(time) {
			return time < 10 ? `0${time}` : time;
		}

		setDays(Math.floor(totalSeconds / 3600 / 24))
		setHours(formatTime(Math.floor(totalSeconds / 3600) % 24))
		setMinutes(formatTime(Math.floor(totalSeconds / 60) % 60))
		setSeconds(formatTime(Math.floor(totalSeconds) % 60))
	}, [currentDateTime])

	const styles = {
		main: {
			backgroundImage: `url(${process.env.PUBLIC_URL + '/snow.jpg'})`
		}
	}

	return (
		<div className='main' style={styles.main}>
			<h1>New Year's Eve</h1>

			<div className='countdown-container'>
				<BigText spanText='days' textClass='days-c' textValue={days} />
				<BigText spanText='hours' textClass='hours-c' textValue={hours} />
				<BigText spanText='minutes' textClass='mins-c' textValue={minutes} />
				<BigText spanText='seconds' textClass='seconds-c' textValue={seconds} />
			</div>				
		</div>
	);
}

export default App;
