import React from 'react';
import LiveGames from './LiveGames';
import { useParams } from 'react-router-dom';
import { gameStatistics } from '../utils/utils';
import { useStateValue } from '../state/state';


const PlayerGameHistory = () => {
	const [{ gameHistory }] = useStateValue();
	const { id } = useParams();
	const name = id.replace('%20', ' ');
	const { allGamesByName } = gameStatistics(gameHistory, name);
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
								Hand
							</td>
							<td>
								Opponent
							</td>
							<td>
								Opponent Hand
							</td>
							<td>
								Date
							</td>
						</tr>
					</thead>
					<tbody>
						{allGamesByName.map(
							(game, i) =>
								<tr key={i}>
									<td>
										{game.name}
									</td>
									<td>
										{game.played}
									</td>
									<td>
										{game.opponentName}
									</td>
									<td>
										{game.opponentPlayed}
									</td>
									<td>
										{game.date}
									</td>
								</tr>)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default PlayerGameHistory;