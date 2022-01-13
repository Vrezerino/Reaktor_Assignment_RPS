import React, { useEffect } from 'react';
import LiveGames from './components/LiveGames';
import GameHistory from './components/GameHistory';
import PlayerGameHistory from './components/PlayerGameHistory';
import Header from './components/Header';

import { useStateValue } from './state/state';
import {
	setGameHistory,
	addLiveGame,
	updateLiveGame,
	deleteLiveGame,
	setNotification,
	setUniquePlayers
} from './state/reducer';
import { getHistory } from './services/rpsService';
import { uniquePlayers } from './utils/utils';

import { Routes, Route } from 'react-router-dom';

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
				dispatch(addLiveGame(gameJSON));
			} else {
				// Update game with result and delete if it finishes.
				dispatch(updateLiveGame(gameJSON));
				setTimeout(() => {
					dispatch(deleteLiveGame(gameJSON.gameId));
				}, 5000);
			}
		};
	}, []);

	return (
		<div className='container'>
			<Header />
			<Routes>
				<Route path='/' element={<LiveGames small={false} />} />
				<Route path='/history' element={<GameHistory />} />
				<Route path='/history/:id' element={<PlayerGameHistory />} />
			</Routes>
			<footer>
			</footer>
		</div>
	);
};

export default App;
