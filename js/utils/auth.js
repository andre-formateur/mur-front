export function setToken(dataToken) {
    localStorage.setItem("token", dataToken.token);
    localStorage.setItem("tokenExpiration", dataToken.expiresAt);
    localStorage.setItem("user", JSON.stringify(dataToken.user));
}

export function getToken() {
    return {
        token: localStorage.getItem("token"),
        tokenExpiration: localStorage.getItem("tokenExpiration"),
        user: JSON.parse(localStorage.getItem("user"))
    }
}

export function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("user");
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