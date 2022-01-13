import React from 'react';
import { useStateValue } from '../state/state';
//import { flushLiveGames } from '../state';
import { determineGameResult } from '../utils/utils';

const LiveGame = ({ game, small }) => {
	let windowWidth = window.innerWidth;

	const playerAWins = determineGameResult(game);
	const a = game.playerA.played;
	const b = game.playerB.played;
	const playerA = game.playerA.name;
	const playerB = game.playerB.name;

	if (game.type === 'GAME_BEGIN') {
		return small && windowWidth < 1460
			? <div className='playing-small'>{playerA} is playing {playerB}...</div>
			: <div className='playing'>
				<span style={{ float: 'left' }}>{playerA}</span>
				<span style={{ float: 'right' }}>{playerB}</span>
			</div>
		;
	} else {
		return (
			<div className={small && windowWidth < 1430 ? 'played-small' : 'played'}>
				{playerAWins === 'tie'
					? <div>{playerA} tied with {playerB} ({a} vs {b})!</div>
					: playerAWins
						? <div>{playerA} wins {playerB}´s {b} with {a}!</div>
						: <div>{playerB} wins {playerA}´s {a} with {b}!</div>}
			</div>
		);
	}
};

const LiveGames = ({ small }) => {
	const [{ liveGames }] = useStateValue();
	return (
		<div className={small ? 'games-list-small' : 'games-list'}>
			{liveGames.map((g, i) => <LiveGame key={i} game={g} small={small} />)}
		</div>
	);
};

export default LiveGames;