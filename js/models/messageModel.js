import { baseUrl, apiErrorMessage } from "../utils/global.js";

export async function getAllMessages(token) {
    try {
        
        const response = await fetch(`${baseUrl}/messages`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const messages = await response.json();
        return messages;

    } catch(error) {

        throw new Error(apiErrorMessage);
    }


}