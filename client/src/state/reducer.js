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
	default:
		return state;
	}
};