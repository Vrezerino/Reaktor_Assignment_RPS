export const baseUrl = 'https://bad-api-assignment.reaktor.com/rps';

export const determineGameResult = game => {
	const a = game.playerA.played;
	const b = game.playerB.played;

	return a !== b
		? (a === 'ROCK' && b === 'SCISSORS')
			|| (a === 'SCISSORS' && b === 'PAPER')
			|| (a === 'PAPER' && b === 'ROCK')
		: 'tie';
};