import axios, { AxiosInstance } from "axios"

// New OpenAI-compatible endpoint (legacy text.pollinations.ai is deprecated)
const pollinationsBaseUrl = "https://text.pollinations.ai/openai"

const instance: AxiosInstance = axios.create({
    baseURL: pollinationsBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
})

export default instance
