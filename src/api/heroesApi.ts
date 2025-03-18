import axios from "axios"

export interface errorApi {
    error: string,
    message: string, 
}


export default axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: import.meta.env.VITE_API_KEY
    } 
})

export const returnErrorMessage = (error: unknown) => {
    let errorApi: errorApi = {
        error: "",
        message: ""
    };
    
    if(axios.isAxiosError(error)) {
        if(error.response) {
            errorApi = error.response.data;
        }
    } else {
        errorApi.error = ""
        errorApi.message = "Ha habido un error, vuelva a intentarlo más tarde."
    }
    
    return errorApi.message
}
