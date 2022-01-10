import React, { useReducer, createContext, useContext } from 'react';

const initialState = {
	rpsHistory: [],
	ongoingGames: [],
	notification: ''
};

export const StateContext = createContext([
	initialState,
	() => initialState
]);

export const StateProvider = ({
	reducer,
	children
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StateContext.Provider value={[state, dispatch]}>
			{children}
		</StateContext.Provider>
	);
};
export const useStateValue = () => useContext(StateContext);
