export const baseUrl = 'https://bad-api-assignment.reaktor.com/rps';

export const sortAscending = array => {
	return array.sort((a, b) => {
		if (typeof a === 'string' && typeof b === 'string') {
			const nameA = a.toLowerCase(), nameB = b.toLowerCase();
			if (nameA < nameB) return -1; // Sort string ascending.
			if (nameA > nameB) return 1;
			return 0; // Default return value (no sorting).
		} else if (typeof a === 'number' && typeof b === 'number') {
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		} else {
			throw new Error('Not a number nor a string!');
		}
	});
};

// Return true if A's hand wins, otherwise false or 'tie'.
export const determineGameResult = game => {
	const a = game.playerA.played;
	const b = game.playerB.played;

	return a !== b
		? (a === 'ROCK' && b === 'SCISSORS')
		|| (a === 'SCISSORS' && b === 'PAPER')
		|| (a === 'PAPER' && b === 'ROCK')
		: 'tie';
};

// Go through each game's playerA and playerB keys, and extract unique names from all.
export const uniquePlayers = games => {
	const uniques = [];
	games.forEach(
		game => {
			const players = Object.keys(game).flatMap(key =>
				key.includes('player')
					? game[key].name
					: []
			);
			players.forEach(p => {
				if (!uniques.includes(p)) uniques.push(p);
			});
		}
	);
	return sortAscending(uniques);
};

export const gameStatistics = (games, uniquePlayer) => {
	let wins = 0;
	let hands = { ROCK: 0, PAPER: 0, SCISSORS: 0 };
	const allHandsByName = [];

	// Get all played hands by name
	games.forEach(
		game => {
			const hand = Object.keys(game).flatMap(key =>
				key.includes('player') && game[key].name === uniquePlayer
					? {
						name: game[key].name,
						played: game[key].played,
						won: key === 'playerA' && determineGameResult(game)
					}
					: []
			);
			hand.forEach(h => {
				allHandsByName.push(h);
			});
		}
	);
	// Get number of wins and each hand.
	allHandsByName.forEach(hand => {
		if (hand.won) wins++;

		if (hand.played === 'ROCK') {
			hands.ROCK++;
		} else if (hand.played === 'PAPER') {
			hands.PAPER++;
		} else if (hand.played === 'SCISSORS') {
			hands.SCISSORS++;
		}
	});
	const totalGamesByName = allHandsByName.length;
	const mostPlayedHand = Object.keys(hands).find(
		key => hands[key] === Math.max(...Object.values(hands))
	);

	return {
		wins,
		winratio: (1 / (totalGamesByName / wins)).toFixed(3),
		mostPlayedHand,
		totalGamesByName
	};
};