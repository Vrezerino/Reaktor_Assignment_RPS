import React, { useEffect } from 'react';
import OngoingGames from './components/OngoinGames';
import { useStateValue } from './state/state';
import {
	setRPSHIstory,
	addOngoingGame,
	updateOngoingGame,
	deleteOngoingGame,
	setNotification
} from './state/reducer';
import { getRPSHIstory } from './services/rpsService';

import rock from './img/rock.png';
import paper from './img/paper.png';
import scissors from './img/scissors.png';

const App = () => {
	const socket = new WebSocket('wss://bad-api-assignment.reaktor.com/rps/live');
	const [{ notification }, dispatch] = useStateValue();

	useEffect(async () => {
		try {
			const data = await getRPSHIstory();
			dispatch(setRPSHIstory(data.data));
		} catch (e) {
			dispatch(setNotification(e.message));
		}
	}, [dispatch]);

	useEffect(() => {
		socket.onmessage = game => {
			// Must parse twice due to excess quotes
			const gameJSON = JSON.parse(JSON.parse(game.data));
			// Add new ongoing game
			if (gameJSON.type === 'GAME_BEGIN') {
				dispatch(addOngoingGame(gameJSON));
			} else {
				// Update it with result and delete
				dispatch(updateOngoingGame(gameJSON));
				setTimeout(() => {
					dispatch(deleteOngoingGame(gameJSON.gameId));
				}, 5000);
			}
		};
	}, []);

	if (notification) return <div>{notification}</div>;

	return (
		<div className='container'>
			<h1>
				<img src={rock} />
				<img src={paper} />
				<img src={scissors} />
			</h1>
			<h2>Live games</h2>
			{/*rpsHistory.map(game =>
				<GameResult
					key={game.gameId}
					game={game}
					playerAWins={determineGameResult(game)} />
			)*/}
			<OngoingGames />
		</div>
	);
};

export default App;
