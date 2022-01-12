import React, { useEffect } from 'react';
import OngoingGames from './components/OngoinGames';
import GameHistory from './components/GameHistory';
import { useStateValue } from './state/state';
import {
	setGameHistory,
	addOngoingGame,
	updateOngoingGame,
	deleteOngoingGame,
	setNotification,
	setUniquePlayers
} from './state/reducer';
import { getHistory } from './services/rpsService';
import { uniquePlayers } from './utils/utils';

import rock from './img/rock.png';
import paper from './img/paper.png';
import scissors from './img/scissors.png';

const App = () => {
	const socket = new WebSocket('wss://bad-api-assignment.reaktor.com/rps/live');
	const [{ notification }, dispatch] = useStateValue();

	useEffect(async () => {
		try {
			const data = await getHistory();
			//console.log('final', data);
			console.log(uniquePlayers(data));
			dispatch(setGameHistory(data));
			dispatch(setUniquePlayers(uniquePlayers(data)));
		} catch (e) {
			dispatch(setNotification(e.message));
		}
	}, [getHistory]);

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

	return (
		<div className='container'>
			<h1>
				<img src={rock} />
				<img src={paper} />
				<img src={scissors} />
			</h1>
			<div className='notification'>{notification}</div>
			<h2>Live games</h2>
			<OngoingGames />
			<GameHistory />
		</div>
	);
};

export default App;
