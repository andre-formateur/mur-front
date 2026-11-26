export function setToken(dataToken) {
    localStorage.setItem("token", dataToken.token);
    localStorage.setItem("tokenExpiration", dataToken.expiresAt);
}

export function getToken() {
    return {
        token: localStorage.getItem("token"),
        tokenExpiration: localStorage.getItem("tokenExpiration")
    }
}

export function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
}

export function isUserLogged() {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if(
        token === null ||
        tokenExpiration === null || 
        new Date(tokenExpiration) <= new Date()
    ) {
        return false;
    }

    return true;
}