export const setRPSHIstory = history => {
	return {
		type: 'SET_RPS_HISTORY',
		payload: history
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

export const deleteOngoingGame = gameId => {
	return {
		type: 'DELETE_ONGOING_GAME',
		payload: gameId
	};
};

export const reducer = (state, action) => {
	switch (action.type) {
	case 'SET_RPS_HISTORY':
		return {
			...state,
			rpsHistory: [
				...action.payload
			],
			...state.rpsHistory
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
	case 'DELETE_ONGOING_GAME':
		return {
			...state,
			ongoingGames: state.ongoingGames.filter(g => g.gameId !== action.payload)
		};
	default:
		return state;
	}
};