import axios from 'axios';
import { baseUrl } from '../utils/utils';

let i = 0;
// Get game history data using cursors.
export const getHistory = async (cursor, data = []) => {
	const response = await axios.get(`${baseUrl}/history${cursor ? `?cursor=${cursor}` : ''}`);
	const contents = JSON.parse(response.data.contents);
	console.log(contents);
	const currentCursor = contents.cursor.split('=')[1];
	i++;

	if (i === 5) // Get five pages of data.
		return data;

	data.push(...contents.data);
	return getHistory(currentCursor, data);
};