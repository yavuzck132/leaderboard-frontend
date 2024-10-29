import { Player } from '@/models/Types';
import axios from 'axios';

// Set the base URL if all endpoints share a common root
const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://leaderboard-backend-apce.onrender.com/api'
    : 'https://localhost:3000/api';

console.log(`Environment is: ${process.env.NODE_ENV}`)

const apiClient = axios.create({
  baseURL: BASE_URL
});

// GET request with query parameters
export const getAutoComplete = async (name: string): Promise<string[]> => {
  try {
    const response = await apiClient.get('/autocomplete', {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from autocomplete:', error);
    throw error;
  }
};

// GET request without query
export const getRankedPlayers = async (): Promise<Player[]> => {
  try {
    const response = await apiClient.get('/ranked');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from ranked', error);
    throw error;
  }
};

// GET request without query
export const getRankedPlayersByCountry = async (): Promise<Player[][]> => {
  try {
    const response = await apiClient.get('/rankedByCountry');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from rankedByCountry:', error);
    throw error;
  }
};



// GET request with query parameters
export const getSelectedPlayerAndNeighbours = async (name: string): Promise<Player[]> => {
  try {
    const response = await apiClient.get('/player', {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from player:', error);
    throw error;
  }
};
