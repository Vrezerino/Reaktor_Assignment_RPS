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

export const setAllGamesByName = games => {
	return {
		type: 'SET_ALL_GAMES_BY_NAME',
		payload: games
	};
};

export const setNotification = notif => {
	return {
		type: 'SET_NOTIFICATION',
		payload: notif
	};
};

export const addLiveGame = game => {
	return {
		type: 'ADD_LIVE_GAME',
		payload: game
	};
};

export const updateLiveGame = game => {
	return {
		type: 'UPDATE_LIVE_GAME',
		payload: game
	};
};

export const flushLiveGames = () => {
	return {
		type: 'FLUSH_LIVE_GAMES',
	};
};

export const deleteLiveGame = gameId => {
	return {
		type: 'DELETE_LIVE_GAME',
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
	case 'SET_ALL_GAMES_BY_NAME':
		return {
			...state,
			allGamesByName: [
				...action.payload
			],
			...state.allGamesByName
		};
	case 'SET_NOTIFICATION':
		return {
			...state,
			notification: action.payload
		};
	case 'ADD_LIVE_GAME':
		return {
			...state,
			liveGames: [
				...state.liveGames, action.payload
			]
		};
	case 'UPDATE_LIVE_GAME':
		return {
			...state,
			liveGames: [
				...state.liveGames.map(g => g.gameId === action.payload.gameId ? action.payload : g)
			]
		};
	case 'DELETE_LIVE_GAME':
		return {
			...state,
			liveGames: state.liveGames.filter(g => g.gameId !== action.payload)
		};
	case 'FLUSH_LIVE_GAMES':
		return {
			...state,
			liveGames: []
		};
	default:
		return state;
	}
};