import React from 'react';
import { Link } from 'react-router-dom';

import rock from '../img/rock.png';
import paper from '../img/paper.png';
import scissors from '../img/scissors.png';

const Header = () => {
	return (
		<>
			<h1>
				<img src={rock} />
				<img src={paper} />
				<img src={scissors} />
			</h1>
			<nav>
				<h2>
					<Link to='/'>Live Games</Link> •&nbsp;
					<Link to='/history'>Game History</Link></h2>
			</nav>
		</>
	);
};

export default Header;