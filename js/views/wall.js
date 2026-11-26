import { getCurrentUser, disconnectUser } from "../models/authModel.js";
import { getToken, removeToken, isUserLogged } from "../utils/auth.js";

async function onPageLoad() {

    !isUserLogged() ? window.location.href = "/" : null;

    // On récupère le token de l'utilisateur
    const dataToken = getToken();

    // Récupérer l'utilisateur courant
    try {
        const currentUser = await getCurrentUser(dataToken);

        // On va afficher l'utilisateur
        const username = document.querySelector("#username");
        username.textContent = currentUser.username;
    } catch (error) {
        removeToken();
        window.location.href = "/";
    }


}

onPageLoad();

document.querySelector("#logout-button").addEventListener("click", async () => {
    const dataToken = getToken();
    removeToken();
    try {
        await disconnectUser(dataToken);
    } finally {
        window.location.href = "/"
    }
})