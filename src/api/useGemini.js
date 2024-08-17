import {useState} from "react"
import axios_instance from "../lib/axios"

const useGemini = () => {
    const [isGeminiLoading, setIsGeminiLoading] = useState(false);
    
    const getResponse = async (text, callback) => {
        setIsGeminiLoading(true)
        try {
            const response = await axios_instance.post(import.meta.env.VITE_BACKEND_BASE_URL+"/v1/gemini/getResponse", {text: text})

            if (![200, 201].includes(response?.status || response?.data?.status)) {
                console.error(response?.data?.message || "Something went wrong while getting response")
            }

            if (callback && typeof callback === "function") {
                callback(response?.data, null)
            }
        } catch (error) {
            callback(null, error)
        } finally {
            setIsGeminiLoading(false)
            console.log("Request complete")
        }
    }

    return {
        isGeminiLoading,
        getResponse
    }
}

export default useGemini