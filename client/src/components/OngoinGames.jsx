import React from 'react';
import { useStateValue } from '../state/state';
import { determineGameResult } from '../utils/utils';

const OngoingGame = ({ game }) => {
	const playerAWins = determineGameResult(game);
	if (game.type === 'GAME_BEGIN') {
		return (
			<div>
				{game.playerA.name} is playing with {game.playerB.name}...
			</div>
		);
	} else {
		return (
			<div>
				{playerAWins === 'tie'
					? <div>{game.playerA.name} ({game.playerA.played}) tied with {game.playerB.name} ({game.playerB.played})!</div>
					: playerAWins
						? <div>{game.playerA.name} wins {game.playerB.name}´s {game.playerB.played} with {game.playerA.played}!</div>
						: <div>{game.playerB.name} wins {game.playerA.name}´s {game.playerA.played} with {game.playerB.played}!</div>}
			</div>
		);
	}
};

const OngoingGames = () => {
	const [{ ongoingGames }] = useStateValue();
	return (
		<div>
			{ongoingGames.map((g, i) => <OngoingGame key={i} game={g} />)}
		</div>
	);
};

export default OngoingGames;