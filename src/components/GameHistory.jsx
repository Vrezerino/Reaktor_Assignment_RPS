import React from 'react';
import LiveGames from './LiveGames';
import { useStateValue } from '../state/state';
import { gameStatistics } from '../utils/utils';

const GameHistory = () => {
	const [{ gameHistory, uniquePlayers }] = useStateValue();

	const statistics = uniquePlayers.map(
		player => {
			const { wins, winratio, mostPlayedHand, totalGamesByName } = gameStatistics(gameHistory, player);
			return (
				<tr key={player}>
					<td>
						{player}
					</td>
					<td>
						{totalGamesByName}
					</td>
					<td>
						{wins}
					</td>
					<td>
						{winratio}
					</td>
					<td>
						{mostPlayedHand}
					</td>
				</tr>
			);
		});

	return (
		<>
			<LiveGames small={true} />
			<div className='game-history'>
				<table>
					<thead>
						<tr>
							<td>
								Name
							</td>
							<td>
								Total Games
							</td>
							<td>
								Wins
							</td>
							<td>
								Win Ratio
							</td>
							<td>
								Most Played Hand
							</td>
						</tr>
					</thead>
					<tbody>
						{statistics}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default GameHistory;