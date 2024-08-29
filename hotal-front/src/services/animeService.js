import axios from 'axios';

// Ensure API_URL is correctly defined in your environment variables
const API_URL = process.env.REACT_APP_API_URL;

export async function getAnimeHome() {
    try {
        const response = await axios.get(`${API_URL}/anime/home`, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers": "origin, content-type, accept",
            }
        });
        return response;  // Return the API response
    } catch (error) {
        console.error("Error fetching anime home data:", error);
        throw error;  // Propagate the error to be handled by the caller
    }
}
