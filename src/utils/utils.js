export const baseUrl = 'https://bad-api-assignment.reaktor.com/rps';

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
	return uniques.sort((a, b) => {
		const nameA = a.toLowerCase(), nameB = b.toLowerCase();
		if (nameA < nameB) return -1; // Sort string ascending.
		if (nameA > nameB) return 1;
		return 0; // Default return value (no sorting).
	});
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
	// Get number of wins and each hand
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

/*
export const parseGames = games => {
	return games.map(game => {
		const gameId = game.gameId;
		const a = game.playerA.played;
		const b = game.playerB.played;
		const playerA = game.playerA.name;
		const playerB = game.playerB.name;
		const player_A_wins = determineGameResult(game);
		return {
			gameId,
			date: new Date(game.t).toLocaleString(),
			winner: player_A_wins !== 'tie' ? player_A_wins ? playerA : playerB : null,
			playerA: {
				name: playerA,
				hand: a,
				// Two points for winning, one point for tie.
				win: player_A_wins !== 'tie' ? player_A_wins ? 2 : 0 : 1
			},
			playerB: {
				name: playerB,
				hand: b,
				win: player_A_wins !== 'tie' ? !player_A_wins ? 2 : 0 : 1
			}
		};
	});
};
*/