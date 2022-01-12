export const setGameHistory = history => {
	return {
		type: 'SET_GAME_HISTORY',
		payload: history
	};
};

export const setUniquePlayers = players => {
	return {
		type: 'SET_UNIQUE_PLAYERS',
		payload: players
	};
};

export const setNotification = notif => {
	return {
		type: 'SET_NOTIFICATION',
		payload: notif
	};
};

export const addOngoingGame = game => {
	return {
		type: 'ADD_ONGOING_GAME',
		payload: game
	};
};

export const updateOngoingGame = game => {
	return {
		type: 'UPDATE_ONGOING_GAME',
		payload: game
	};
};

export const deleteOngoingGame = gameId => {
	return {
		type: 'DELETE_ONGOING_GAME',
		payload: gameId
	};
};

export const reducer = (state, action) => {
	switch (action.type) {
	case 'SET_GAME_HISTORY':
		return {
			...state,
			gameHistory: [
				// Descending order by game time
				...action.payload.sort((g1, g2) => g2.t - g1.t)
			],
			...state.gameHistory
		};
	case 'SET_UNIQUE_PLAYERS':
		return {
			...state,
			uniquePlayers: [
				...action.payload
			],
			...state.uniquePlayers
		};
	case 'SET_NOTIFICATION':
		return {
			...state,
			notification: action.payload
		};
	case 'ADD_ONGOING_GAME':
		return {
			...state,
			ongoingGames: [
				...state.ongoingGames, action.payload
			]
		};
	case 'UPDATE_ONGOING_GAME':
		return {
			...state,
			ongoingGames: [
				...state.ongoingGames.map(g => g.gameId === action.payload.gameId ? action.payload : g)
			]
		};
	case 'DELETE_ONGOING_GAME':
		return {
			...state,
			ongoingGames: state.ongoingGames.filter(g => g.gameId !== action.payload)
		};
	default:
		return state;
	}
};