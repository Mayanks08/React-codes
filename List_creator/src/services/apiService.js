

import axios from 'axios';

const API_URL = 'https://apis.ccbp.in/list-creation/lists';

// Utility to simulate delay (optional, can be removed in production)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch lists from the real API
export const fetchLists = async () => {
  try {
    // Optional: simulate network delay
    await delay(1500);  // Remove or comment this in production

    const response = await axios.get(API_URL);
    return response.data.lists;

  } catch (error) {
    console.error('Error fetching lists:', error);
    throw error;
  }
};

// Update lists using the real API
export const updateLists = async (listsData) => {
  try {
    // Optional: simulate network delay
    await delay(1000);  // Remove or comment this in production

    const response = await axios.put(API_URL, listsData);
    return response.data;

  } catch (error) {
    console.error('Error updating lists:', error);
    throw error;
  }
};
