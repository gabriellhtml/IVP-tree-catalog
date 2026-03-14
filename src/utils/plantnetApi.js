// plantnetApi.js

const axios = require('axios');

const PLANTNET_API_URL = 'https://api.plantnet.org/v2/identify/all';
const API_TOKEN = 'YOUR_API_TOKEN'; // Replace with your PlantNet API token

/**
 * Identify species from an image using PlantNet API.
 * @param {string} imageUrl - The URL of the image to identify.
 * @returns {Promise<Object>} - The identified species data.
 */
async function identifySpecies(imageUrl) {
    try {
        const response = await axios.post(PLANTNET_API_URL, {
            images: [imageUrl],
        }, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error identifying species:', error);
        throw error;
    }
}

module.exports = { identifySpecies };