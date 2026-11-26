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

export async function getMessageById(id, token) {
    try {
        
        const response = await fetch(`${baseUrl}/messages/${id}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await response.json();

        if(!response.ok) {
            throw data;
        }

        return data;

    } catch(data) {

        if(data.error) {
            throw new Error(data.error)
        }

        throw new Error(apiErrorMessage);
    }
    
}

export async function createMessage(content, token) {
    try {
        
        const response = await fetch(`${baseUrl}/messages`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({content})
        });
        const data = await response.json();

        if(!response.ok) {
            throw data
        }

        return data;

    } catch(data) {

        if(data.error) {
            throw new Error(data.error);
        }

        throw new Error(apiErrorMessage);
    }
    
}

export async function updateMessage(id, content, token) {
    try {
        
        const response = await fetch(`${baseUrl}/messages/${id}`, {
            method: "PATCH",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({content})
        });
        const data = await response.json();

        if(!response.ok) {
            throw data
        }

        return data;

    } catch(data) {

        if(data.error) {
            throw new Error(data.error);
        }

        throw new Error(apiErrorMessage);
    }
    
}

export async function deleteMessage(id, token) {
    try {
        
        const response = await fetch(`${baseUrl}/messages/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if(response.status === 403) {
            throw {error: "Ce n'est pas votre post !"};
        }

        if(response.status === 404) {
            throw {error: "Ce post n'existe pas !"};
        }

    } catch(data) {

        if(data.error) {
            throw new Error(data.error)
        }

        throw new Error(apiErrorMessage);
    }
}