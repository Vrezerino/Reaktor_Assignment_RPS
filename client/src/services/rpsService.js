import axios from 'axios';
import { baseUrl } from '../utils/utils';

export const getRPSHIstory = async () => {
	const response = await axios.get(`${baseUrl}/history`);
	return response.data;
};