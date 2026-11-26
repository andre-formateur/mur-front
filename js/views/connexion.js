import { connectUser, getCurrentUser } from "../models/authModel.js";
import { getToken, removeToken, setToken, isUserLogged } from "../utils/auth.js";
import { showError, hideError } from "../utils/error.js";

async function onPageLoad() {
    const userLogged = isUserLogged();

    if (userLogged) {
        const dataToken = getToken();
        try {
            await getCurrentUser(dataToken);
            window.location.href = "mur.html";
        } catch {
            removeToken();
        } 
    }
}

onPageLoad();

document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const errorId = "error";
    hideError(errorId);


    // Récupérer l'email et le password
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        // Essayer de se connecter avec l'email et le password
        const dataToken = await connectUser(email, password);

        // On stock le token et l'expiration reçu dans le localStorage 
        setToken(dataToken);

        // On redirige vers le wall
        window.location.href = "/mur.html";
    } catch (error) {
        showError(errorId, error);
    }


})