import axios from "axios";

class SecretsApi {
    BASE_URL = 'https://secrets-api.appbrewery.com';

    static SecretsApiError = class extends Error {
        constructor(message) {
            super(message)
        }
    }

    constructor(username, password, apiKey, bearerToken) {
        this.username = username
        this.password = password
        this.apiKey = apiKey
        this.bearerToken = bearerToken
        this.axiosInstance = axios.create( { baseURL: this.BASE_URL } )
    }

    async getRandom() {
        return this.tryRequest(async () => {
            const response = await this.axiosInstance.get('/random')
            return response.data
        })
    }

    async getAll() {
        return this.tryRequest(async () => {
            const response = await this.axiosInstance.get('/all', {
                auth: {
                    username: this.username,
                    password: this.password
                },
                params: {
                    page: 2
                }
            })
            return response.data
        })
    }

    async getSecretsWithFilter(embarrassmentScore) {
        return this.tryRequest(async () => {
            const response = await this.axiosInstance.get('/filter', {
                params: {
                    apiKey: this.apiKey,
                    score: embarrassmentScore 
                }
            })
            return response.data
        })
    }

    async getSecretById(id) {
        return this.tryRequest(async () => {
            const response = await this.axiosInstance.get(`/secrets/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.bearerToken}`
                }
            })
            return response.data
        })
    }

    async tryRequest(callback) {
        try {
            return await callback()
        } catch(error) {
            console.error("Failed to make request:", error.message)
            throw new SecretsApi.SecretsApiError(error.message)
        }
    }
}

export default SecretsApi