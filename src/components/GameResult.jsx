import React from 'react';

const GameResult = ({ game, playerAWins }) => {
	return (
		<div>
			{playerAWins === 'tie' ? <div>tie</div> : playerAWins ? <div>Player A wins!</div> : <div>Player B wins!</div>}
			{game.playerA.played} {game.playerB.played}
			<hr />
		</div>
	);
};

export default GameResult;