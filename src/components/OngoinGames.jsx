import React from 'react';
import { useStateValue } from '../state/state';
import { determineGameResult } from '../utils/utils';

const OngoingGame = ({ game }) => {
	const playerAWins = determineGameResult(game);
	const a = game.playerA.played;
	const b = game.playerB.played;
	const playerA = game.playerA.name;
	const playerB = game.playerB.name;

	if (game.type === 'GAME_BEGIN') {
		return (
			<div className='playing'>
				<span style={{ float: 'left' }}>{playerA}</span>
				<span style={{ float: 'right' }}>{playerB}</span>
			</div>
		);
	} else {
		return (
			<div className='played'>
				{playerAWins === 'tie'
					? <div>{playerA} tied with {playerB} ({a} vs {b})!</div>
					: playerAWins
						? <div>{playerA} wins {playerB}´s {b} with {a}!</div>
						: <div>{playerB} wins {playerA}´s {a} with {b}!</div>}
			</div>
		);
	}
};

const OngoingGames = () => {
	const [{ ongoingGames }] = useStateValue();
	return (
		<div className='games-list'>
			{ongoingGames.map((g, i) => <OngoingGame key={i} game={g} />)}
		</div>
	);
};

export default OngoingGames;