import axios from "axios";

class SecretsApi {
    BASE_URL = 'https://secrets-api.appbrewery.com';

    static SecretsApiError = class extends Error {
        constructor(message) {
            super(message)
        }
    }

    constructor(bearerToken) {
        this.bearerToken = bearerToken
        this.axiosInstance = axios.create(
            {
                baseURL: this.BASE_URL,
                headers: { Authorization: `Bearer ${bearerToken}` }
            }
        )
    }

    async getRandom() {
        return this.tryRequest(async () => {
            const response = await this.axiosInstance.get('/random')
            return response.data
        })
    }

    async getSecretById(id) {
        return this.tryRequest(async () => {
            const response = await this.axiosInstance.get(`/secrets/${id}`)

            return response.data
        })
    }

    async postSecret(secret, score) {
        return this.tryRequest(async () => {
            const response = await this.axiosInstance.post('/secrets', {
                secret: secret,
                score: score
            })

            return response.data
        })
    }

    async putSecret(id, secret, score) {
        return this.tryRequest(async () => {
            const response = await this.axiosInstance.put(`/secrets/${id}`, {
                secret: secret,
                score: score
            })

            return response.data
        })
    }

    async patchSecret(id, secret, score) {
        let params = {}
        
        if (secret) {
            params.secret = secret
        }

        if (score) {
            params.score = score
        }

        return this.tryRequest(async () => {
            const response = await this.axiosInstance.patch(`/secrets/${id}`, params)
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

    async deleteSecretById(id) {
        return this.tryRequest(async () => {
            const response = await this.axiosInstance.delete(`/secrets/${id}`)

            return response.data
        })
    }
}

export default SecretsApi