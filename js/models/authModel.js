import { baseUrl, apiErrorMessage } from "../utils/global.js";

export async function connectUser(email, password) {
    try {

        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });
        const data = await response.json()

        if(!response.ok) {
            throw data;
        }

        return data;

    } catch (data) {

        if(data.error) {
            throw new Error(data.error);
        }

        throw new Error(apiErrorMessage);
    }

}

export async function registerUser(username, email, password) {
    try {

        const response = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({username, email, password})
        });
        const data = await response.json()

        if(!response.ok) {
            throw data;
        }

        return data;

    } catch (data) {

        if(data.error) {
            throw new Error(data.error);
        }

        throw new Error(apiErrorMessage);
    }

}

export async function getCurrentUser(dataToken) {
    try {

        const response = await fetch(`${baseUrl}/auth/me`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${dataToken.token}`}
        });
        const data = await response.json()

        if(!response.ok) {
            throw data;
        }

        return data;

    } catch (data) {

        if(data.error) {
            throw new Error(data.error);
        }

        throw new Error(apiErrorMessage);
    }
}

export async function disconnectUser(dataToken) {
    try {

        const response = await fetch(`${baseUrl}/auth/logout`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${dataToken.token}`}
        });


        if(!response.ok) {
            throw "Problème avec le token fourni";
        }

    } catch (data) {

        if(data) {
            throw new Error(data);
        }

        throw new Error(apiErrorMessage);
    }
}