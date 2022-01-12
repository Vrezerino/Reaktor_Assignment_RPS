import React, { useEffect } from 'react';
import LiveGames from './components/LiveGames';
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

import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
	const socket = new WebSocket('wss://bad-api-assignment.reaktor.com/rps/live');
	const [, dispatch] = useStateValue();

	useEffect(async () => {
		try {
			const data = await getHistory();
			dispatch(setGameHistory(data));
			// Extract unique players from historic game data.
			dispatch(setUniquePlayers(uniquePlayers(data)));
		} catch (e) {
			dispatch(setNotification(e.message));
		}
	}, [getHistory]);

	useEffect(() => {
		socket.onmessage = game => {
			// Must parse twice due to excess quotes.
			const gameJSON = JSON.parse(JSON.parse(game.data));
			// Add new ongoing game.
			if (gameJSON.type === 'GAME_BEGIN') {
				dispatch(addOngoingGame(gameJSON));
			} else {
				// Update game with result and delete if it finishes.
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
			<nav>
				<h2><Link to='/'>Live Games</Link> • <Link to='/history'>Game History</Link></h2>
			</nav>
			<Routes>
				<Route path='/' element={<LiveGames small={false}/>} />
				<Route path='/history' element={<GameHistory />} />
			</Routes>
		</div>
	);
};

export default App;
