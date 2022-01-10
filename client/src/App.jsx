import React, { useEffect } from 'react';
//import GameResult from './components/GameResult';
import OngoingGames from './components/OngoinGames';
//import { determineGameResult } from './utils/utils';
import { useStateValue } from './state/state';
import {
	setRPSHIstory,
	addOngoingGame,
	setNotification,
	deleteOngoingGame } from './state/reducer';
import { getRPSHIstory } from './services/rpsService';

const App = () => {
	const socket = new WebSocket('ws://bad-api-assignment.reaktor.com/rps/live');
	const [{ rpsHistory, notification }, dispatch] = useStateValue();

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
				dispatch(addOngoingGame(gameJSON));
				setTimeout(() => {
					dispatch(deleteOngoingGame(gameJSON.gameId));
				}, 5000);
			}
		};
	}, []);

	if (notification) return <div>{notification}</div>;

	return rpsHistory && (
		<div>
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
