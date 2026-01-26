import axios from "axios";

/**
 * Bored API Service used to interact with the Bored API.
 */
class BoredApi {
    BASE_URL = 'https://bored-api.appbrewery.com';
    NO_ACTIVITiES_FOUND_MESSAGE = 'No activities that match your criteria.'

    static BoredApiError = class extends Error {
        constructor(message) {
            super(message)
        }
    }

    constructor() {
        this.axiosInstance = axios.create( { baseURL: this.BASE_URL } )
    }

    /**
     * Will get a random task from the Bored API.
     * 
     * @returns {object}            The response from Bored API.
     * @throws {BoredApiError}      Error if something wrong happened with Bored API request.
     */
    async getRandom() {
        try {
            const response = await this.axiosInstance.get('/random')
            return response.data
        } catch(error) {
            console.error("Failed to make request:", error.message)
            throw new BoredApi.BoredApiError(error.message)
        }
    }

    /**
     * Will get a random task based off of task type and amount of participants
     * needed for the desired task.
     * 
     * @param {string}         type Optional. The type of activity to filter by. Choice 
     *                              of education, recreational, social, charity, cooking,
     *                              relaxation, busywork. 
     * @param {string} participants Optional. The number of participants to filter
     *                              by. Choice of 1, 2, 3, 4, 5, 6, 8.
     * @returns {object}            The response from Bored API.
     * @throws {BoredApiError}      Error if something wrong happened with Bored API request.
     */
    async getRandomFilter(type, participants) {
        try {
            const response = await this.axiosInstance.get('/filter', {
                params: {
                    type: type,
                    participants: participants
                }
            })

            const result = response.data;
            const result_count = result.length

            if (result_count <= 0) {
                throw new BoredApi.BoredApiError(NO_ACTIVITiES_FOUND_MESSAGE)
            }

            return result[Math.floor(Math.random() * result_count)]
        } catch(error) {
            if (error.status == 404) {
                throw new BoredApi.BoredApiError(this.NO_ACTIVITiES_FOUND_MESSAGE)
            }

            console.error("Failed to make request:", error.message)
            throw new BoredApi.BoredApiError(error.message)
        }
    }
}

export default BoredApi