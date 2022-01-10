/* eslint-disable */
import React, { useEffect } from 'react';
import GameResult from './components/GameResult';
import { determineGameResult } from './utils/utils';
import { useStateValue } from './state/state';
import { setRPSHIstory, setNotification } from './state/reducer';
import { getRPSHIstory } from './services/rpsService';

const App = () => {
	const [{ rpsHistory, notification }, dispatch] = useStateValue();
	useEffect(async () => {
		try {
			const data = await getRPSHIstory();
			console.log(data);
			dispatch(setRPSHIstory(data.data));
		} catch (e) {
			dispatch(setNotification(e.message));
		}
	}, [dispatch]);
	
	if (notification) return <div>{notification}</div>;

	return rpsHistory && (
		<div>
			{rpsHistory.map(game =>
				<GameResult
					key={game.gameId}
					game={game}
					playerAWins={determineGameResult(game)} />
			)}
		</div>
	);
};

export default App;
